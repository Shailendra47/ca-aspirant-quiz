Add-Type -AssemblyName System.Drawing

function FindGold($path, $name) {
    $bmp = [System.Drawing.Bitmap]::FromFile($path)
    Write-Host "Searching gold in $name"
    for ($y = 80; $y -le 140; $y += 5) {
        for ($x = 400; $x -le 850; $x += 10) {
            $c = $bmp.GetPixel($x, $y)
            # Gold color is high R (e.g. > 180), high G (e.g. > 140), low B (e.g. < 80)
            if ($c.R -gt 180 -and $c.G -gt 140 -and $c.B -lt 80) {
                Write-Host "$name Gold at ($x, $y): R=$($c.R) G=$($c.G) B=$($c.B)"
            }
        }
    }
    $bmp.Dispose()
}

FindGold "C:\Users\ACER\.gemini\antigravity\brain\dba9f733-5305-430f-bcce-5d7fb9739df6\.user_uploaded\media_1792568338646_7befb3a2.png" "Image 1"
FindGold "C:\Users\ACER\.gemini\antigravity\brain\dba9f733-5305-430f-bcce-5d7fb9739df6\.user_uploaded\media_1792568390531_83b81011.png" "Image 2"

