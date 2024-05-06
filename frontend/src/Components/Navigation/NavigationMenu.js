import HomeIcon from "@mui/icons-material/Home"
import ExploreIcon from "@mui/icons-material/Explore"
import NotificationIcon from "@mui/icons-material/Notifications"
import VerifiedIcon from '@mui/icons-material/Verified';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PendingIcon from '@mui/icons-material/Pending';
import EventNoteIcon from '@mui/icons-material/EventNote';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export const navigationMenu=[
    {
        title:"Home",
        icon:<HomeIcon/>,
        path:"/home"
    },
    {
        title: "Workout Plans",
        icon:<EventNoteIcon/>,
        path:"/workoutplan"
    },
    {
        title: "Meal Plans",
        icon:<RestaurantIcon/>,
        path:"/mealplan"
    },
    {
        title:"Profile",
        icon:<AccountCircleIcon/>,
        path:"/profile"
    },
    {
        title:"Notifications",
        icon:<NotificationIcon/>,
        path:"/notifications"
    },
    {
        title:"Verified",
        icon:<VerifiedIcon/>,
        path:"/verified"
    },
    {
        title:"Explore",
        icon:<ExploreIcon/>,
        path:"/explore"
    },
    {
        title:"More",
        icon:<PendingIcon/>,
        path:"/more"
    }
   
]