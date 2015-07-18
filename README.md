# Timeseries Demo

The time series graph can be inspected by mousing over any value in the graph and can be zoomed using the handy subgraph. Mousing over the elements in the legend will bring the representation of that category in the graph to the fore, and clicking on an element in the legend will toggle it's display in the graph. Additionally, the donut graph on the left displays car counts per day of the week.

I used D3 and C3 for charting, Bootstrap for page layout, Underscore for some functional tools, and wrote a few utilities to further clean the data.

The data is being loaded and parsed dynamically using the ParsePapa library directly from the csv in the src directory. You can see all the code on Github.
