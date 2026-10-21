Add-Type -AssemblyName System.Drawing

function CheckNav($path, $name) {
    $bmp = [System.Drawing.Bitmap]::FromFile($path)
    # The navbar buttons [Practice Exam] [Textbook Notes] are around x=450 to x=650, y=70 to 110
    # Let's sample colors across the nav bar
    Write-Host "=== $name ==="
    for ($x = 460; $x -le 660; $x += 20) {
        $c = $bmp.GetPixel($x, 90)
        Write-Host "x=$x, y=90: R=$($c.R), G=$($c.G), B=$($c.B)"
    }
    $bmp.Dispose()
}

CheckNav "C:\Users\ACER\.gemini\antigravity\brain\dba9f733-5305-430f-bcce-5d7fb9739df6\.user_uploaded\media_1792568338646_7befb3a2.png" "Image 1"
CheckNav "C:\Users\ACER\.gemini\antigravity\brain\dba9f733-5305-430f-bcce-5d7fb9739df6\.user_uploaded\media_1792568390531_83b81011.png" "Image 2"

