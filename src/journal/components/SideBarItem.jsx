import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice"
import { useMemo } from "react"

export const SideBarItem = ({ title = '', body, id, date, imageUrls} ) => {
  
  const dispatch = useDispatch();

  const onClickNote = () => {
    dispatch( setActiveNote({
        title, body, id, date, imageUrls: ['https://unsplash.com/es/fotos/a3vDd8hzuYs', 'https://unsplash.com/es/fotos/TZ312UVgSIc']
    }))
  }

  const newTitle = useMemo(()=>{
    return title.length > 17
        ? title.substring(0, 17) + '...'
        : title;
  }, [title]);

  return (
        <ListItem disablePadding>
            <ListItemButton onClick={ onClickNote }>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ body } />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
