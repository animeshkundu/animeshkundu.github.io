#!/usr/bin/env bash
# Runs the merge gate in the same order used by the redesign specification.

set -euo pipefail

run_step() {
  local label="$1"
  shift
  printf '\n[%s]\n' "$label"
  "$@"
}

if ! command -v npm >/dev/null 2>&1; then
  printf 'npm is required.\n' >&2
  exit 1
fi

if [ ! -d node_modules ]; then
  run_step "install" npm ci --ignore-scripts
fi

run_step "1/6 astro check" npm run typecheck
run_step "2/6 eslint" npm run lint
run_step "3/6 forbidden copy" npm run check:copy
run_step "4/6 vitest coverage" npm run test:coverage
run_step "5/6 astro build" npm run build
run_step "5/6 static output" npm run check:static
run_step "5/6 built copy" npm run check:copy
run_step "6/6 multi-browser e2e" npm run test:e2e

printf '\nAll validation steps passed.\n'
