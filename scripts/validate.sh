#!/bin/bash
# Description: Runs all quality checks for the repository
# Usage: ./scripts/validate.sh
#
# This script runs type checking, linting, unit tests, build, and E2E tests.
# All agents MUST run this script before committing changes.

set -e  # Exit on error
set -o pipefail  # Catch pipe failures

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[✗]${NC} $1"
}

log_step() {
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

# Check if npm is available
check_dependencies() {
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed. Please install Node.js and npm."
        exit 1
    fi
}

# Install dependencies if node_modules doesn't exist
install_deps() {
    if [ ! -d "node_modules" ]; then
        log_info "node_modules not found. Installing dependencies..."
        npm ci
    fi
}

# Main validation function
main() {
    echo ""
    echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║           AI-Enabled Repository Validation                 ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""

    # Track start time
    START_TIME=$(date +%s)

    # Check dependencies
    check_dependencies
    install_deps

    # Step 1: Type Checking
    log_step "Step 1/5: Type Checking"
    log_info "Running TypeScript type checker..."
    if npm run typecheck; then
        log_success "Type checking passed"
    else
        log_error "Type checking failed"
        exit 1
    fi

    # Step 2: Linting
    log_step "Step 2/5: Linting"
    log_info "Running ESLint..."
    if npm run lint; then
        log_success "Linting passed"
    else
        log_error "Linting failed"
        exit 1
    fi

    # Step 3: Unit Tests
    log_step "Step 3/5: Unit Tests"
    log_info "Running Vitest..."
    if npm test; then
        log_success "Unit tests passed"
    else
        log_error "Unit tests failed"
        exit 1
    fi

    # Step 4: Build
    log_step "Step 4/5: Build"
    log_info "Building with Vite..."
    if npm run build; then
        log_success "Build succeeded"
    else
        log_error "Build failed"
        exit 1
    fi

    # Step 5: E2E Tests
    log_step "Step 5/5: E2E Tests"
    log_info "Running Playwright tests..."
    if npm run test:e2e; then
        log_success "E2E tests passed"
    else
        log_error "E2E tests failed"
        exit 1
    fi

    # Calculate duration
    END_TIME=$(date +%s)
    DURATION=$((END_TIME - START_TIME))

    # Final summary
    echo ""
    echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                    ALL VALIDATIONS PASSED                  ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    log_success "Total time: ${DURATION} seconds"
    echo ""
    echo -e "${GREEN}Ready to commit! 🚀${NC}"
    echo ""
}

# Run main function
main "$@"
