/* Import Custom Components */
import Map from "../../../Components/Map/Map";
import { Group } from "../../../Components/Map/Groups";
import { Layers } from "../../../Components/Map/Layers";
import { TileLayer } from "../../../Components/Map/Layers";

/* Import Context Managers */
import { useMapContext } from "../../../context/map.context";

const MapPanel = () => {
  /** Calling map context provider */
  const { mapCtxView, mapCtxInitLayerGroups } = useMapContext();

  return (
    <div
      className="
				w-screen
				h-[calc(100vh-48px)]
        p-1
        sm:w-[calc(100vw-64px)]"
    >
      <Map
        center={mapCtxView.center}
        zoom={mapCtxView.zoom}
        options={{ layerList: true, drawingTools: false }}
      >
        {mapCtxInitLayerGroups.map((gr) => (
          <Group key={gr.id}>
            <Layers key={gr.id}>
              {gr.layers.map((lyr) =>
                lyr.type === "osm" || lyr.type === "esri-sat" ? (
                  <TileLayer
                    key={lyr.id}
                    type={lyr.type}
                    id={lyr.id}
                    label={lyr.label}
                    zIndex={lyr.index}
                    visible={lyr.visible}
                    groupId={gr.id}
                    groupLabel={gr.label}
                    groupZIndex={gr.index}
                  />
                ) : (
                  <></>
                )
              )}
            </Layers>
          </Group>
        ))}
      </Map>
    </div>
  );
};

export default MapPanel;
