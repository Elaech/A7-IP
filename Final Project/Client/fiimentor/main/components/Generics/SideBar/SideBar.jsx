import React from 'react';

import './SideBar.css';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TelegramIcon from '@material-ui/icons/Telegram';

const SideBar =()=> {

    return (
      <div>
        <Drawer
            variant="permanent"
            anchor="left"
        >
          <List className="List">
            {['ACASA', 'POSTARI', 'INTALNIRI', 'PROIECTE', 'PROFESORI'].map((text, index) => (
                <div className="DrawerContent">
                    <ListItem button key={index}>
                        <ListItemIcon>{<TelegramIcon />}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                </div>
            ))}
          </List>
        </Drawer>
      </div>
    );
  }

  export {SideBar};
