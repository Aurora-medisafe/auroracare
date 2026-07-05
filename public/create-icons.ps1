Add-Type -AssemblyName System.Drawing

$publicDir = "C:\Users\ASUS\.qclaw-oversea\workspace\protectusafewithlove-web\public"

# Create 192x192 icon
$bmp1 = New-Object System.Drawing.Bitmap(192,192)
$g1 = [System.Drawing.Graphics]::FromImage($bmp1)
$g1.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g1.Clear([System.Drawing.Color]::FromArgb(232,115,90))

# Draw a heart shape
$heartBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$points1 = @(
    [System.Drawing.Point]::new(96,45),
    [System.Drawing.Point]::new(50,85),
    [System.Drawing.Point]::new(96,145),
    [System.Drawing.Point]::new(142,85)
)
$g1.FillPolygon($heartBrush, $points1)

# Add "P" letter
$font1 = New-Object System.Drawing.Font('Arial',60,[System.Drawing.FontStyle]::Bold)
$blackBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(232,115,90))
$format1 = New-Object System.Drawing.StringFormat
$format1.Alignment = [System.Drawing.StringAlignment]::Center
$format1.LineAlignment = [System.Drawing.StringAlignment]::Center
$rect1 = New-Object System.Drawing.RectangleF(0,0,192,192)
$g1.DrawString('P',$font1,$blackBrush,$rect1,$format1)

$bmp1.Save("$publicDir\icon-192.png",[System.Drawing.Imaging.ImageFormat]::Png)
$g1.Dispose()
$bmp1.Dispose()

# Create 512x512 icon
$bmp2 = New-Object System.Drawing.Bitmap(512,512)
$g2 = [System.Drawing.Graphics]::FromImage($bmp2)
$g2.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g2.Clear([System.Drawing.Color]::FromArgb(232,115,90))

# Draw heart shape
$points2 = @(
    [System.Drawing.Point]::new(256,120),
    [System.Drawing.Point]::new(130,230),
    [System.Drawing.Point]::new(256,390),
    [System.Drawing.Point]::new(382,230)
)
$g2.FillPolygon($heartBrush, $points2)

# Add "P" letter
$font2 = New-Object System.Drawing.Font('Arial',160,[System.Drawing.FontStyle]::Bold)
$rect2 = New-Object System.Drawing.RectangleF(0,0,512,512)
$g2.DrawString('P',$font2,$blackBrush,$rect2,$format1)

$bmp2.Save("$publicDir\icon-512.png",[System.Drawing.Imaging.ImageFormat]::Png)
$g2.Dispose()
$bmp2.Dispose()

$heartBrush.Dispose()
$blackBrush.Dispose()
$font1.Dispose()
$font2.Dispose()

Write-Host "Icons created successfully!"
