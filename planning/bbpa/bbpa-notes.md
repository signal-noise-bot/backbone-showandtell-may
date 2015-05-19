# Intro - DATA DRIVEN VISUALISATIONS
	## What is BBPA?
	- Essentially created single page website for BBPA
	- Fully responsive down to mobile

# How it works
	## Demo Overview
	- Site is made up of 2 sections, center area containing 3 basic bespoke visualitions
	- Visuals powered by collection of data that can be filtered to be more relevant
	- The visuals are data driven, keeping them up to data was easy. Fully leverage backbone events system.
	- One collection for filtered data
	- One model that handles which handles which filters are set
	- The filtered collections listens to that model. Updates accordingly (examples)
	- All graphs used the same data format, achieved by adding methods to model

	## Sidebar 
	- 2 types of graphs, stacked bar and pie chart
	- Visuals were made to be modular / reusable

	## Stacked bar
	- Show json 
	- Show markup
	- Show how it updates
	- Highlight that its made in HTML and CSS (woah not d3)

	## Pie chart
	- Slightly more advanced
	- Built with SVG
	- Arc helper
	- Different use cases
	- Show example of 1 segment
	- Show example of multiple segments
	- Show customisability

	## Spinning Numbers
	- Used everywhere on here
	- Just HTML and CSS
	- Just function where you chuck a number and it spins