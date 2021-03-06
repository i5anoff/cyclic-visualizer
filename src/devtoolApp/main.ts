import xs, { Stream }           from 'xstream'
import { DOMSource, VNode }     from '@cycle/dom'
import { TimeSource }           from '@cycle/time'
import { StateSource, Reducer } from '@cycle/state'
import {
  Source as CytoSource,
  Request as CytoRequest
}                               from 'drivers/cytoscapeDriver'
import {
  Source as MessageSource,
  SetZapSpeedMessage,
  GetZapDataMessage
}                               from 'drivers/messageDriver'
import applicationGraph         from './operations/applicationGraph'
import componentsGraph          from './operations/componentsGraph'
import appState                 from './operations/appState'
import switchPanels             from './operations/switchPanels'
import zap                      from './operations/zap'
import view                     from './view'

export interface State {
  appState:        any,
  visiblePanel:    "appState" | "components" | "graph",
  zapSpeed:        number,
  parents:         Array<string>;
  selectedNodes:   Array<cytoscape.NodeSingular>;
  selectedNodeIds: Array<string>;
  zapData:         { [k: string]: number };
}

interface Sources {
  DOM:      DOMSource;
  time:     TimeSource;
  cyto:     CytoSource;
  messages: MessageSource;
  state:    StateSource<State>;
}

interface Sinks {
  state:    Stream<Reducer<State>>;
  DOM:      Stream<VNode>;
  time:     Stream<any>;
  cyto:     Stream<CytoRequest>;
  messages: Stream<SetZapSpeedMessage | GetZapDataMessage>;
}

export default function main(sources: Sources): Sinks {
  const applicationGraphSinks = applicationGraph(sources)
  const componentsGraphSinks  = componentsGraph(sources)
  const appStateSinks         = appState(sources)
  const switchPanelsSinks     = switchPanels(sources)
  const zapSinks              = zap(sources)
  const view$                 = view({ parent: sources.state.stream })
  const cyto$                 = xs.merge(
    applicationGraphSinks.cyto,
    componentsGraphSinks.cyto
  )
  const state$                = xs.merge(
    applicationGraphSinks.state,
    componentsGraphSinks.state,
    appStateSinks.state,
    switchPanelsSinks.state,
    zapSinks.state
  ).startWith(() => ({
    appState:        undefined,
    cytoConfig:      undefined,
    visiblePanel:    "appState",
    zapSpeed:        20,
    parents:         [],
    selectedNodes:   [],
    selectedNodeIds: [],
    zapData:         {}
  }))
  const messages$             = xs.merge(
    zapSinks.messages,
    applicationGraphSinks.messages
  )
  const time$                 = xs.empty()

  return {
    DOM:      view$,
    state:    state$,
    time:     time$,
    cyto:     cyto$,
    messages: messages$
  }
}
