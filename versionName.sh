#!/bin/sh
git -C $(dirname "$0") describe --tags --abbrev=0 | sed -n "s/v//p"
