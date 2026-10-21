Add-Type -AssemblyName System.Drawing
$i1 = [System.Drawing.Image]::FromFile("C:\Users\ACER\.gemini\antigravity\brain\dba9f733-5305-430f-bcce-5d7fb9739df6\.user_uploaded\media_1792568338646_7befb3a2.png")
$i2 = [System.Drawing.Image]::FromFile("C:\Users\ACER\.gemini\antigravity\brain\dba9f733-5305-430f-bcce-5d7fb9739df6\.user_uploaded\media_1792568390531_83b81011.png")
Write-Host "Image 1: $($i1.Width) x $($i1.Height)"
Write-Host "Image 2: $($i2.Width) x $($i2.Height)"
$i1.Dispose()
$i2.Dispose()

