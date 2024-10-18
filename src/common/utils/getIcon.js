import React from 'react'

import About from 'common/icons/About'
import Add from 'common/icons/Add'
import Alphabet from 'common/icons/Alphabet'
import ArrowDivider from 'common/icons/ArrowDivider'
import ArrowDown from 'common/icons/ArrowDown'
import ArrowUp from 'common/icons/ArrowUp'
import Audio from 'common/icons/Audio'
import BackArrow from 'common/icons/BackArrow'
import Bookmark from 'common/icons/Bookmark'
import Categories from 'common/icons/Categories'
import CheckCircleSolid from 'common/icons/CheckCircleSolid'
import Checkmark from 'common/icons/Checkmark'
import ChevronDown from 'common/icons/ChevronDown'
import ChevronLeft from 'common/icons/ChevronLeft'
import ChevronRight from 'common/icons/ChevronRight'
import ChevronUp from 'common/icons/ChevronUp'
import ChevronUpDown from 'common/icons/ChevronUpDown'
import Close from 'common/icons/Close'
import Community from 'common/icons/Community'
import Copy from 'common/icons/Copy'
import Create from 'common/icons/Create'
import Dashboard from 'common/icons/Dashboard'
import Device from 'common/icons/Device'
import Devices from 'common/icons/Devices'
import Dictionary from 'common/icons/Dictionary'
import Download from 'common/icons/Download'
import Exclamation from 'common/icons/Exclamation'
import ExclamationTriangleSolid from 'common/icons/ExclamationTriangleSolid'
import Facebook from 'common/icons/Facebook'
import Flashcard from 'common/icons/Flashcard'
import ForwardSlash from 'common/icons/ForwardSlash'
import Fullscreen from 'common/icons/Fullscreen'
import FVLogo from 'common/icons/FVLogo'
import FVShortLogo from 'common/icons/FVShortLogo'
import Generations from 'common/icons/Generations'
import GoTo from 'common/icons/GoTo'
import Grid from 'common/icons/Grid'
import HamburgerMenu from 'common/icons/HamburgerMenu'
import Home from 'common/icons/Home'
import Images from 'common/icons/Images'
import ImagesNone from 'common/icons/ImagesNone'
import InfoCircleSolid from 'common/icons/InfoCircleSolid'
import Instagram from 'common/icons/Instagram'
import Kids from 'common/icons/Kids'
import Learn from 'common/icons/Learn'
import Lessons from 'common/icons/Lessons'
import Link from 'common/icons/Link'
import LinkedIn from 'common/icons/LinkedIn'
import Lock from 'common/icons/Lock'
import Login from 'common/icons/Login'
import LogOut from 'common/icons/LogOut'
import Mail from 'common/icons/Mail'
import MapLocation from 'common/icons/MapLocation'
import Microphone from 'common/icons/Microphone'
import MicrophoneOff from 'common/icons/MicrophoneOff'
import Minus from 'common/icons/Minus'
import Mobile from 'common/icons/Mobile'
import More from 'common/icons/More'
import Mute from 'common/icons/Mute'
import Next from 'common/icons/Next'
import OrderedList from 'common/icons/OrderedList'
import Pause from 'common/icons/Pause'
import PauseCircle from 'common/icons/PauseCircle'
import PC from 'common/icons/PC'
import Pencil from 'common/icons/Pencil'
import PlaceHolder from 'common/icons/PlaceHolder'
import Play from 'common/icons/Play'
import PlayCircle from 'common/icons/PlayCircle'
import Preview from 'common/icons/Preview'
import Previous from 'common/icons/Previous'
import Print from 'common/icons/Print'
import Qrcode from 'common/icons/Qrcode'
import Question from 'common/icons/Question'
import QuestionCircleSolid from 'common/icons/QuestionCircleSolid'
import Quotation from 'common/icons/Quotation'
import Reports from 'common/icons/Reports'
import RightArrow from 'common/icons/RightArrow'
import RightArrowCircle from 'common/icons/RightArrowCircle'
import Save from 'common/icons/Save'
import Search from 'common/icons/Search'
import Speak from 'common/icons/Speak'
import Spinner from 'common/icons/Spinner'
import Star from 'common/icons/Star'
import Stop from 'common/icons/Stop'
import StopCircle from 'common/icons/StopCircle'
import Resources from 'common/icons/Resources'
import Tablet from 'common/icons/Tablet'
import TimesCircle from 'common/icons/TimesCircle'
import TimesCircleSolid from 'common/icons/TimesCircleSolid'
import Translate from 'common/icons/Translate'
import Trash from 'common/icons/Trash'
import TryAgain from 'common/icons/TryAgain'
import Twitter from 'common/icons/Twitter'
import UnorderedList from 'common/icons/UnorderedList'
import UnfoldMore from 'common/icons/UnfoldMore'
import Upload from 'common/icons/Upload'
import Video from 'common/icons/Video'
import WebPages from 'common/icons/WebPages'
import WebShare from 'common/icons/WebShare'
import Widget from 'common/icons/Widget'
import Wrench from 'common/icons/Wrench'
import Youtube from 'common/icons/Youtube'

// Doc Types
import Phrase from 'common/icons/Phrase'
import Song from 'common/icons/Song'
import Story from 'common/icons/Story'
import Word from 'common/icons/Word'

// Games
import Canoe from 'common/icons/Canoe'
import Jigsaw from 'common/icons/Jigsaw'
import Memory from 'common/icons/Memory'
import PhraseScrambler from 'common/icons/PhraseScrambler'
import Quiz from 'common/icons/Quiz'
import WordSearch from 'common/icons/WordSearch'
import Wordsy from 'common/icons/Wordsy'

// Visibility
import Members from 'common/icons/Members'
import Public from 'common/icons/Public'
import Team from 'common/icons/Team'

import { isStringWithLength } from 'common/utils/stringHelpers'
import { PUBLIC, MEMBERS, TEAM } from 'common/constants'

// a helper function that given a string name returns an icon, if no string is supplied it will return a blank placeholder icon

function getIcon(iconName, iconStyling, title) {
  const styling = iconStyling || 'fill-current h-12 w-8'
  const icons = {
    About,
    Add,
    Alphabet,
    ArrowDivider,
    ArrowDown,
    ArrowUp,
    Audio,
    BackArrow,
    Bookmark,
    Canoe,
    Categories,
    CheckCircleSolid,
    Checkmark,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    ChevronUpDown,
    Close,
    Community,
    Copy,
    Create,
    Dashboard,
    Device,
    Devices,
    Dictionary,
    Download,
    Exclamation,
    ExclamationTriangleSolid,
    Facebook,
    Flashcard,
    ForwardSlash,
    Fullscreen,
    FVLogo,
    FVShortLogo,
    Generations,
    GoTo,
    Grid,
    HamburgerMenu,
    Home,
    Images,
    ImagesNone,
    InfoCircleSolid,
    Instagram,
    Jigsaw,
    Kids,
    Learn,
    Lessons,
    Link,
    LinkedIn,
    Lock,
    Login,
    LogOut,
    Mail,
    MapLocation,
    Members,
    Memory,
    Microphone,
    MicrophoneOff,
    Minus,
    Mobile,
    More,
    Mute,
    Next,
    OrderedList,
    Pause,
    PauseCircle,
    PC,
    Pencil,
    Phrase,
    PlaceHolder,
    Play,
    PlayCircle,
    Preview,
    Previous,
    Print,
    Public,
    Qrcode,
    Question,
    QuestionCircleSolid,
    Quiz,
    Quotation,
    Reports,
    Resources,
    RightArrow,
    RightArrowCircle,
    Save,
    Search,
    Song,
    Speak,
    Spinner,
    Star,
    Stop,
    StopCircle,
    Story,
    Tablet,
    Team,
    TimesCircle,
    TimesCircleSolid,
    Translate,
    Trash,
    TryAgain,
    Twitter,
    UnorderedList,
    UnfoldMore,
    Upload,
    Video,
    WebPages,
    WebShare,
    Widget,
    Word,
    Wordsy,
    Wrench,
    PhraseScrambler,
    WordSearch,
    Youtube,
  }

  function cleanString(string) {
    const lower = isStringWithLength(string) ? string.toLowerCase() : ''
    switch (lower) {
      case 'category':
      case 'categories':
        return 'Categories'
      case 'game':
      case 'games':
        return 'Jigsaw'
      case 'phrase':
      case 'phrases':
        return 'Phrase'
      case 'story':
      case 'stories':
        return 'Story'
      case 'song':
      case 'songs':
        return 'Song'
      case 'word':
      case 'words':
        return 'Word'
      case TEAM:
      case 'team':
        return 'Team'
      case MEMBERS:
      case 'members':
        return 'Members'
      case PUBLIC:
      case 'public':
        return 'Public'
      default:
        return string
    }
  }

  const iconFile = icons[cleanString(iconName)]
  const Icon = iconFile || PlaceHolder
  return <Icon styling={styling} title={title} />
}
export default getIcon
