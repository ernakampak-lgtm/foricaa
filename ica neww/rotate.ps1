Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap("d:\Portofolio Web\Sertifikat\IMG_20260825_120858_218.jpg.jpeg")
$bmp.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone)
$bmp.Save("d:\Portofolio Web\Sertifikat\Diskominfo-Sulteng-Bug-Hunter-Landscape.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()
Write-Host "ROTATED SUCCESSFULLY"
