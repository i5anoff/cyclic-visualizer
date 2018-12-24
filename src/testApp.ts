import * as cytoscape  from 'cytoscape'
import * as dagre from 'cytoscape-dagre'

cytoscape.use(dagre)

function renderCytoscape(window: Window) {
  // const nodes = map(graph._nodes, (node: any) => ({data: { id: node.id, label: node.label}}))
  // const edges = map(graph._edgeObjs, (edge, _) => ({data: { id: `${edge.v}>${edge.w}`, source: edge.v, target: edge.w }}))
  console.log("RENDERING")
  const element = <HTMLElement>window.document.querySelector('.Graph')

  const config = <cytoscape.CytoscapeOptions>{
    container: element,
    boxSelectionEnabled: false,
    autounselectify: true,
    elements: {
      nodes: [
        { data: { id: 'n0' } },
        { data: { id: 'n1' } },
        { data: { id: 'n2' } },
        { data: { id: 'n3' } },
        { data: { id: 'n4' } },
        { data: { id: 'n5' } },
        { data: { id: 'n6' } },
        { data: { id: 'n7' } },
        { data: { id: 'n8' } },
        { data: { id: 'n9' } },
        { data: { id: 'n10' } },
        { data: { id: 'n11' } },
        { data: { id: 'n12' } },
        { data: { id: 'n13' } },
        { data: { id: 'n14' } },
        { data: { id: 'n15' } },
        { data: { id: 'n16' } }
      ],
      edges: [
        { data: { source: 'n0', target: 'n1' } },
        { data: { source: 'n1', target: 'n2' } },
        { data: { source: 'n1', target: 'n3' } },
        { data: { source: 'n4', target: 'n5' } },
        { data: { source: 'n4', target: 'n6' } },
        { data: { source: 'n6', target: 'n7' } },
        { data: { source: 'n6', target: 'n8' } },
        { data: { source: 'n8', target: 'n9' } },
        { data: { source: 'n8', target: 'n10' } },
        { data: { source: 'n11', target: 'n12' } },
        { data: { source: 'n12', target: 'n13' } },
        { data: { source: 'n13', target: 'n14' } },
        { data: { source: 'n13', target: 'n15' } },
      ]

      // nodes: nodes,
      // edges: edges
    },
    layout: {
      name: 'dagre',
    },
    style: [{
      selector: 'node',
      style: {
        'label': 'data(id)',
        'background-color': '#11479e'
      }
    }, {
      selector: 'edge',
      style: {
        'width': 4,
        'target-arrow-shape': 'triangle',
        'line-color': '#9dbaea',
        'target-arrow-color': '#9dbaea',
        'curve-style': 'bezier'
      }
    }],
  }

  console.log("config", config)

  const cy = cytoscape(config)
}

renderCytoscape(window)