$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$port = 8123

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$port/")
$listener.Start()
Write-Output "Serving $root on http://127.0.0.1:$port/"

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".svg"  = "image/svg+xml"
  ".ico"  = "image/x-icon"
}

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $request = $context.Request
  $response = $context.Response
  try {
    $path = $request.Url.AbsolutePath
    if ($path -eq "/") { $path = "/index.html" }
    $filePath = Join-Path $root ($path.TrimStart("/") -replace "/", [IO.Path]::DirectorySeparatorChar)
    $fullRoot = [IO.Path]::GetFullPath($root)
    $fullFile = [IO.Path]::GetFullPath($filePath)
    if (-not $fullFile.StartsWith($fullRoot) -or -not (Test-Path $fullFile -PathType Leaf)) {
      $response.StatusCode = 404
      $bytes = [Text.Encoding]::UTF8.GetBytes("Not found")
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $ext = [IO.Path]::GetExtension($fullFile).ToLower()
      $contentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" }
      $response.ContentType = $contentType
      $bytes = [IO.File]::ReadAllBytes($fullFile)
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
    }
  } catch {
    $response.StatusCode = 500
  } finally {
    $response.OutputStream.Close()
  }
}
