// import { Typography } from "@mui/material"
import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
// import { NoteView } from "../views/NoteView"
import { NothingSelectedView } from "../views/NothingSelectedView"
import { AddOutlined } from "@mui/icons-material"

export const JournalPage = () => {
  return (
  
    <JournalLayout>
      {/* <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit quos numquam dolore sequi quae praesentium mollitia neque laborum? Reiciendis voluptatum odio quis possimus alias enim, exercitationem eligendi sequi suscipit ea ab minima deleniti et animi earum magnam voluptate error veniam beatae cupiditate aliquam. Dolore architecto explicabo, illum temporibus veniam magnam?</Typography> */}
      <NothingSelectedView />
      {/* <NoteView /> */}
      <IconButton
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {backgroundColor: 'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />

      </IconButton>
    </JournalLayout>
  )
}
