# CuteMute

![example-gif](example.gif)

## What

Change the color of a Phillips Hue light depending on your Zoom microphone status. For example, turn the light red when your microphone is hot, and turn the light off when your microphone is muted.

Only works on Mac. Tested on Mac OS 10.13.6.

## Why

By training yourself, Pavlov's Dog-style, to associate the color of a physical light with your mute status on Zoom you significantly reduce the possibility of accidentally doing something embarrassing in front of your colleagues or classmates.

## Get Started

* `npm install`
* Make sure you're on the same network as your Hue bridge
* `npm run setup`

You'll be guided through linking to your Hue bridge, selecting the light you want to use, and choosing how often the script should ping your Zoom app for the current mute status.

After you've configured your Hue bridge and selected a light, run

* `npm start`

and join a Zoom meeting. It should work.

## Commands

### `npm start`

Run the program. Make sure you have run the setup script first.
 
### `npm run setup`
 
Connect to your local Hue bridge, choose the light you want to use, and change how often the script checks your Zoom app for the current mute status.

### `npm run helpers`

Pick from a few helper functions. List all of the lights found on your local Hue system, or manually test what your light will look like when you're muted or unmuted.
