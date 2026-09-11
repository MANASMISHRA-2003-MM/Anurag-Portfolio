$status = git status 2>&1
$log = git log --oneline -5 2>&1
$remote = git remote -v 2>&1

"=== STATUS ===" | Out-File -FilePath "git_output.txt"
$status | Out-File -FilePath "git_output.txt" -Append
"=== LOG ===" | Out-File -FilePath "git_output.txt" -Append
$log | Out-File -FilePath "git_output.txt" -Append
"=== REMOTE ===" | Out-File -FilePath "git_output.txt" -Append
$remote | Out-File -FilePath "git_output.txt" -Append

Get-Content "git_output.txt"
