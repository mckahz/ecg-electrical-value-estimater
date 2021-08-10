function numberWithCommas(x)
{
    parts = (x/100).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function getChecked(elementId)
{
    return document.getElementById(elementId).checked;
}

function update()
{       
    // Update the total cost at the bottom
    function getPrice(elementId, priceIfOn)
    {
        return getChecked(elementId) ? priceIfOn : 0;
    }
    document.getElementById("total_cost").innerHTML = "Total: $\n" + numberWithCommas(
        getPrice("pp8", 100000) +
        getPrice("pp16", 200000) +
        getPrice("small_inverter", 10000) +
        getPrice("big_inverter", 20000) +
        getPrice("downlights", 80000) +
        getPrice("hot_water_system", 500000)
    );
    
    //update how the house looks
    function setVisible(elementId, visible)
    {
        document.getElementById(elementId).style.visibility = visible ? "visible" : "hidden";
    }
    setVisible("svg-sun", getChecked("downlights"));
    setVisible("svg-solar-panel-1", getChecked("pp8") || getChecked("pp16"));
    setVisible("svg-solar-panel-2", getChecked("pp16"));
    setVisible("svg-water-drop", getChecked("hot_water_system"));
    setVisible("svg-thermometer", getChecked("hot_water_system"));
    setVisible("svg-lightning-small", getChecked("small_inverter"));
    setVisible("svg-lightning-big", getChecked("big_inverter"));

    //update the text detailing the costs
    function getDetailsString(elementId, string)
    {
        return getChecked(elementId) ? string : "";
    }
    document.getElementById("cost-details").innerHTML =
        getDetailsString("pp8", "8 Package Panel : $1,000.00<br>") +
        getDetailsString("pp16", "16 Package Panel : $2,000.00<br>") +
        getDetailsString("small_inverter", "Small Inverter : $100.00<br>") +
        getDetailsString("big_inverter", "Big Inverter : $200.00<br>") +
        getDetailsString("downlights", "Downlights : $800.00<br>") +
        getDetailsString("hot_water_system", "Hot Water System : $5000.00")
    ;

    //change the background
    function getFootprintQuality(elementId, value)
    {
        return getChecked(elementId) ? value : 0;
    }
    var footprintQuality = (
        getFootprintQuality("pp8", 1) +
        getFootprintQuality("pp16", 2) +
        getFootprintQuality("small_inverter", 1) +
        getFootprintQuality("big_inverter", 2) +
        getFootprintQuality("downlights", 2) +
        getFootprintQuality("hot_water_system", 2)
    );
    document.getElementsByTagName("body").style.backgroundImage = "url(\"background-" + footprintQuality.toString() + ".png\")";

    //change the cost of the bill
    var initialBill = document.getElementById("current-bill").value;
    function multFromIdAndValue(elementId, value)
    {
        return document.getElementById(elementId).checked ? value : 0;
    }
    var multiplier = 1 - (
        multFromIdAndValue("pp8", 0.125) +
        multFromIdAndValue("pp16", 0.25) +
        multFromIdAndValue("small_inverter", 0.125) +
        multFromIdAndValue("big_inverter", 0.25) +
        multFromIdAndValue("downlights", 0.25) +
        multFromIdAndValue("hot_water_system", 0.25)
    );
    var reducedBill = multiplier * initialBill;
    document.getElementById("bill-with-services").innerHTML = 
        document.getElementById("current-bill").value == 0
            ? "Please Enter Your Bill"
            : reducedBill == 0
                ? "FREE!"
                : "$" + numberWithCommas(reducedBill * 100);
}

window.onload = function()
{
    update();
}