@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\node_modules\nativescript-dev-webpack\bin\generate-android-snapshot" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\node_modules\nativescript-dev-webpack\bin\generate-android-snapshot" %*
)