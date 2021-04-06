property btnTitle : "Mute audio"

set zoomStatus to "closed"
set muteStatus to "disabled"

if application "zoom.us" is running then
    set zoomStatus to "open"
    tell application "System Events"
  	tell application process "zoom.us"
  		if exists (menu item btnTitle of menu 1 of menu bar item "Meeting" of menu bar 1) then
            set muteStatus to "unmuted"
  		else
            set muteStatus to "muted"
  		end if
  	end tell
  end tell
end if

copy "{\"mute\":\"" & (muteStatus as text) & "\",\"status\":\"" & (zoomStatus as text) & "\"}" to stdout
