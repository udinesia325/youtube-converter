const ytdl = require("ytdl-core")
const express = require("express")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))



app.post("/download", async (req, res) => {
    try {
        const { url } = req.body
        const { videoDetails: { title } } = await ytdl.getInfo(url, { format: "mp3" })
        res.setHeader("Content-Disposition", `attachment; filename="${title}.mp3"`)

        ytdl(url, { format: "mp3", quality:"lowest"}).pipe(res)



    } catch (error) {
        res.redirect("/")
    }

})

app.listen(PORT, () => console.log(`Server berjalan pada port ${PORT}`))
