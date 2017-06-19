/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Data reloading
let reload = () => {
  // Your data parsing here...
  let data = []
  d3.tsv("afcw-results.tsv", function (d) {
    return d
  }, function (error, data) {
    let goal = data.map((d) => {
      return d.GoalsScored
    })
    svg.selectAll('rect')
      .data(goal)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => {
        return i * 22
      })
      .attr('y', (d) => {
        return height - (d * 100)
      })
      .attr('width', 20)
      .attr('height', (d) => {
        return d * 100
      })
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here

}

reload()
