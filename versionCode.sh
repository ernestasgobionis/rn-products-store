#!/bin/sh
git -C $(dirname "$0") rev-list $1 --count
