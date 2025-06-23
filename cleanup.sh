#!/bin/bash

# Clean up existing ._ files
echo "Cleaning up ._ files..."
find /Volumes/extern/Code/Windsurf/Webshop -name "._*" -type f -delete

# Prevent future creation of ._ files
echo "Preventing future ._ file creation..."
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool true
defaults write com.apple.desktopservices DSDontWriteUSBStores -bool true

# Apply settings to current session
export COPYFILE_DISABLE=1
export COPY_EXTENDED_ATTRIBUTES_DISABLE=1

# Restart Finder to apply changes
killall Finder

echo "Cleanup complete! ._ files have been removed and settings updated to prevent them from coming back."
echo "Note: You may need to restart your code editor to see the changes."
