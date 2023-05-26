import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"

export const NoteView = () => {
  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>28</Typography>
        </Grid>
        <Grid>
            <Button>
                <SaveOutlined sx={{ fontSize:30, mr: 1 }} />
                Save
            </Button>
        </Grid>
        <Grid container>
          <TextField 
            type="text"
            variant="filled"
            fullWidth
            placeholder="Enter Title"
            label="Title"
            sx={{ border: 'none', mb: 1 }}
          />

          <TextField 
            type="text"
            variant="filled"
            fullWidth
            multiline
            placeholder="Tell me about today?"
            minRows={5}
          />
        </Grid>

        <ImageGallery />
        
    </Grid>
  )
}
