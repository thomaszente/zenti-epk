#!/usr/bin/env python3
"""Check that every local file index.html points at is actually in the repo.

There is no build step for this site, so this stands in for one: the most
likely way to break the page is to reference an image, track or frame that
was never committed. Run it with `python3 scripts/check-assets.py`.
"""

import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML = os.path.join(ROOT, 'index.html')

SKIP_PREFIXES = ('http://', 'https://', '//', '#', 'data:', 'mailto:', 'tel:')
ASSET_DIRS = ('frames', 'audio', 'img', 'video')


def referenced(html):
    """Paths the page asks for. Skips anything a script builds by concatenation."""
    found = set()
    for match in re.finditer(r'(?:src|href|poster)="([^"]+)"', html):
        url = match.group(1)
        if url.startswith(SKIP_PREFIXES):
            continue
        found.add(url.split('?')[0].split('#')[0])
    for match in re.finditer(r"""['"]((?:%s)/[^'"]+)['"]""" % '|'.join(ASSET_DIRS), html):
        found.add(match.group(1))
    # A path with no file extension is a fragment of a concatenated string
    # (for example "frames/dawn-" + index + ".webp"), not a real reference.
    return {p for p in found if p and os.path.splitext(p)[1]}


def main():
    html = open(HTML, encoding='utf-8').read()
    refs = sorted(referenced(html))
    missing = [r for r in refs if not os.path.exists(os.path.join(ROOT, r))]

    # The dawn sequence is numbered in script; check the whole run explicitly.
    total = re.search(r'var TOTAL=(\d+)', html)
    if total:
        count = int(total.group(1))
        for i in range(1, count + 1):
            frame = 'frames/dawn-%03d.webp' % i
            if not os.path.exists(os.path.join(ROOT, frame)):
                missing.append(frame)
        print('dawn frames expected: %d' % count)

    print('local references checked: %d' % len(refs))
    if missing:
        print('\nMISSING (%d):' % len(missing))
        for m in missing:
            print('  ' + m)
        return 1
    print('all present')
    return 0


if __name__ == '__main__':
    sys.exit(main())
