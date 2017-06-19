/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
marginLeft = 40

var colorScale = d3.scaleLinear()
  yScale = d3.scaleLinear()

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width + marginLeft)
  .attr('height', height)

// Data reloading
let reload = () => {
  // Your data parsing here...
  let data = []
  d3.tsv("afcw-results.tsv", function (d) {
    let goals = d.map(data => {
      return data.GoalsScored
    })
    redraw(goals)
  })
}

// redraw function
let redraw = (data) => {
  colorScale.domain([0, d3.max(data)]).range(['red', 'yellow'])
  yScale.domain([0, d3.max(data)]).range([0, height - margin])

  let yAxis = d3.scaleLinear().domain([0, d3.max(data)]).range([height - margin, 0])
  let xAxis = d3.scaleLinear().domain([0, data.length]).range([0, width])

  let barWidth = width/data.length

  // Your data to graph here
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('fill', colorScale)
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      return i * barWidth + marginLeft
    })
    .attr('y', (d) => {
      return height - yScale(d) - margin
    })
    .attr('width', barWidth - 2)
    .attr('height', (d) => {
      return yScale(d)
    })

  svg.append('g')
    .attr('class', 'axisSteelBlue')
    .attr('transform', `translate(${marginLeft})`)
    .call(d3.axisLeft(yAxis).ticks(d3.max(data)))
  svg.append('g')
    .attr('class', 'axisSteelBlue')
    .attr('transform', `translate(${marginLeft}, ${height - margin})`)
    .call(d3.axisBottom(xAxis).ticks(data.length))
}

reload()
