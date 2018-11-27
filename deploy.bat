RMDIR ..\firebase\public /S /Q
mkdir ..\firebase\public
ng build
xcopy dist\autohub ..\firebase\public