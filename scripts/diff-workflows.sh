#!/usr/bin/env bash
# Diff fra due versioni di workflow n8n nella cartella workflows/.
# Normalizza JSON con jq prima del diff per ridurre rumore.
#
# Uso: ./scripts/diff-workflows.sh v2.0 v2.1
#      ./scripts/diff-workflows.sh v2.1 v2.2

set -euo pipefail

if [ "$#" -ne 2 ]; then
  echo "Uso: $0 <versione_a> <versione_b>" >&2
  echo "Esempio: $0 v2.0 v2.1" >&2
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "ERRORE: jq non installato. Installa con: sudo apt install jq" >&2
  exit 2
fi

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WF_DIR="$REPO_ROOT/workflows"

A="$1"
B="$2"

# Trova file (gestisce em-dash e spazi nel nome)
FILE_A="$(find "$WF_DIR" -maxdepth 1 -type f -name "*${A}*.json" | head -n1)"
FILE_B="$(find "$WF_DIR" -maxdepth 1 -type f -name "*${B}*.json" | head -n1)"

if [ -z "$FILE_A" ] || [ ! -f "$FILE_A" ]; then
  echo "ERRORE: workflow versione '$A' non trovato in $WF_DIR" >&2
  exit 3
fi
if [ -z "$FILE_B" ] || [ ! -f "$FILE_B" ]; then
  echo "ERRORE: workflow versione '$B' non trovato in $WF_DIR" >&2
  exit 3
fi

echo "Diff: $(basename "$FILE_A")  →  $(basename "$FILE_B")"
echo "---"

TMP_A="$(mktemp)"
TMP_B="$(mktemp)"
trap 'rm -f "$TMP_A" "$TMP_B"' EXIT

jq --sort-keys '.' "$FILE_A" > "$TMP_A"
jq --sort-keys '.' "$FILE_B" > "$TMP_B"

diff -u "$TMP_A" "$TMP_B" || true
