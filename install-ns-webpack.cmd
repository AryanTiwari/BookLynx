@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\node_modules\nativescript-dev-webpack\bin\install-ns-webpack" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\node_modules\nativescript-dev-webpack\bin\install-ns-webpack" %*
)