#!/usr/bin/env bash
set +H

PAT="global\['!'\]|_\$_1e42|rmcej%otb%|fa-solid-400\.woff2|public/fonts/fa-solid-400|node[[:space:]]+\./public/fonts/fa-solid-400\.woff2|temp_auto_push|temp_interactive_push|branch_structure\.json|\"runOn\"[[:space:]]*:[[:space:]]*\"folderOpen\"|\"task\.allowAutomaticTasks\"[[:space:]]*:[[:space:]]*true|String\.fromCharCode\(127\)|function[[:space:]]+sfL\(w\)|Tgw\(2509\)|return[[:space:]]+1358"

OUT="polinrider-check-report.tsv"
: > "$OUT"
printf "repo_path\tstatus\tmatched_file\treason\tremote_url\n" >> "$OUT"

echo ""
echo "PolinRider repo security check"
echo "Location: $(pwd)"
echo "Report file: $OUT"
echo ""

repos_found=0
affected_repos=0

while IFS= read -r gitdir; do
  repo="${gitdir%/.git}"
  repos_found=$((repos_found + 1))
  remote="$(git -C "$repo" remote get-url origin 2>/dev/null || echo "no-origin")"

  matches="$(find "$repo" \
    \( -name node_modules -o -name .git -o -name dist -o -name build -o -name .next -o -name coverage -o -name .cache -o -name venv -o -name .venv -o -name env -o -name tutorial-env -o -name __pycache__ -o -name site-packages \) -prune -o \
    -type f -print0 2>/dev/null |
    xargs -0 grep -IlE "$PAT" 2>/dev/null || true)"

  if [ -n "$matches" ]; then
    affected_repos=$((affected_repos + 1))
    echo "[NEEDS REVIEW] $repo"
    echo "Remote: $remote"

    while IFS= read -r file; do
      [ -z "$file" ] && continue
      rel="${file#$repo/}"

      reason="known malware indicator"
      case "$rel" in
        .vscode/tasks.json|.vscode/settings.json)
          reason="VS Code automatic task path"
          ;;
        public/fonts/fa-solid-400.woff2)
          reason="fake font payload"
          ;;
        postcss.config.*|tailwind.config.*|eslint.config.*|vite.config.*|webpack.config.*|next.config.*)
          reason="JS/TS config injection"
          ;;
        .gitignore)
          reason="hiding/spread markers"
          ;;
      esac

      echo "  - $rel"
      echo "    reason: $reason"
      printf "%s\t%s\t%s\t%s\t%s\n" "$repo" "NEEDS_REVIEW" "$rel" "$reason" "$remote" >> "$OUT"
    done <<< "$matches"

    echo "Action: DO NOT open, run, push, pull, or fetch this repo."
    echo ""
  fi
done < <(find . -type d -name .git -prune 2>/dev/null)

echo "----------------------------------------"
echo "Repos scanned: $repos_found"

if [ "$affected_repos" -eq 0 ]; then
  echo "Result: NO KNOWN INDICATORS FOUND in this folder."
else
  echo "Result: $affected_repos repo(s) need review."
  echo "Send $OUT to your coach/project lead."
fi
