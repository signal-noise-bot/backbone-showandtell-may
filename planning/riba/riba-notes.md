# Intro - DATA DRIVEN EVERYTHING
	## What is this site:
	- To compare your questionnaire to all other companies within RIBA

	## Demo site
	- Show pages
	- Show graphs
	- Download and export CSV or PDF
	- Show control panel and adjusting it - allows you to compare to similar sized practices

# How it works
	## Structure of views
	- Explain what data driven actually means - JSON that drives the nav, router, all content and also the filters / controls
	- Diagram / flow chart thing
	
	## Router
	- Show routes regex
	- Getting the page data and the section data. 
	- Create a new content view
	- Pass through the page data we need which contains all section data and the content data

	## Navigation Sidebar
	- Navigation uses the same json data to render the outline of the pages and sections
	- The navigation has events and listens to route changes
	- onRouteChange uses the route slug to determine which navigation item should be highlighted
	- Navigation items dont use click events but instead just rely on the href and standard link html ----> !! What about the query string??
	- All opening and closing animations use the route

	## Controls Sidebar
	- Controls use a separate json file
	- Each control is a separate model and that is stored in a collection
	- Benefit of using models for each control means we can easily store the state of the control panel and send it to the backend or loop through and create a query string
	- Logic for each control, such as conditionally show or hiding controls based on the state of other controls is  managed in the collection.
	- Each control is rendered separately when the controls collection updates

	## Content View Sections
	- Content view loops over all the sections and creates a section view for each
	- Each section creates a graph as well as all the controls (show example of json)

	## Visuals
	- Each visual has an update function
	- Nothing funky, just basic html and css for bar graphs. Keeps resizing really simple
	- Controls send events to the visualisations and dont directly call methods. This allows visulations to subscribe to events and take actions on them accordantly - probably doesnt need to be said
	- Scrolling triggers the router which in turns triggers the visulation intro animations

# Questions
	- Your function declaration is malformed, why is that???
	Shhh!!!
	- Should we break our collections down into nav, pages, etc
	
	- Reason why the data is powering the frontend / why everything coming from json file??
	This allows us add and remove content easily and keeps the nasty data logic out of our views and to let the backend handle it.