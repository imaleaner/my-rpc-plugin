// Private RPC Plugin for Revenge Next
(function () {
    let updateInterval = null;

    function setActivity(title, details) {
        try {
            // Locate Discord's internal dispatcher via Revenge or Vendetta global window objects
            const Dispatcher = window.revenge?.modules?.findByProps("dispatch", "subscribe") 
                            || window.Vendetta?.modules?.findByProps("dispatch", "subscribe");

            if (!Dispatcher) return;

            Dispatcher.dispatch({
                type: "LOCAL_ACTIVITY_UPDATE",
                activity: {
                    name: title,
                    type: 0, // 0 = Playing, 2 = Listening, 3 = Watching
                    details: details,
                    state: "Active on Mobile",
                    timestamps: {
                        start: Date.now()
                    },
                    assets: {
                        large_image: "https://i.imgur.com/8QzXy9P.png",
                        large_text: title
                    }
                }
            });
        } catch (err) {
            console.error("[RPC Error]", err);
        }
    }

    return {
        onLoad: function () {
            // Set activity on load and refresh every 15 seconds
            setActivity("Custom Status", "Testing Revenge Next Plugin");
            updateInterval = setInterval(function () {
                setActivity("Custom Status", "Testing Revenge Next Plugin");
            }, 15000);
        },
        onUnload: function () {
            if (updateInterval) clearInterval(updateInterval);
            setActivity("", "");
        }
    };
})
  ();
