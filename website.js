function numberWithCommas(x)
{
    parts = (x/100).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function getElementOn(elementName)
{
    return document.getElementById(elementName).checked;
}

function getPrice(elementName, priceIfOn)
{
    return getElementOn(elementName) ? priceIfOn : 0;
}

function setVisible(elementName, visible)
{
    document.getElementById(elementName).style.visibility = visible ? "visible" : "hidden";
}

function getChecked(elementName)
{
    return document.getElementById(elementName).checked;
}

function getDetailsString(elementName, string)
{
    return getElementOn(elementName) ? string : "";
}

function update()
{       
    // Update the total cost at the bottom
    document.getElementById("total_cost").innerHTML = "Total: $\n" + numberWithCommas(
        getPrice("pp8", 100000) +
        getPrice("pp16", 200000) +
        getPrice("small_inverter", 10000) +
        getPrice("big_inverter", 20000) +
        getPrice("downlights", 80000) +
        getPrice("hot_water_system", 500000)
    );

    //update how the house looks
    setVisible("svg-sun", getChecked("downlights"));
    setVisible("svg-solar-panel-1", getChecked("pp8") || getChecked("pp16"));
    setVisible("svg-solar-panel-2", getChecked("pp16"));
    setVisible("svg-water-drop", getChecked("hot_water_system"));
    setVisible("svg-thermometer", getChecked("hot_water_system"));
    setVisible("svg-lightning-small", getChecked("small_inverter"));
    setVisible("svg-lightning-big", getChecked("big_inverter"));

    //update the text detailing the costs
    document.getElementById("cost-details").innerHTML =
        getDetailsString("pp8", "8 Package Panel : $1,000.00<br>") +
        getDetailsString("pp16", "16 Package Panel : $2,000.00<br>") +
        getDetailsString("small_inverter", "Small Inverter : $100.00<br>") +
        getDetailsString("big_inverter", "Big Inverter : $200.00<br>") +
        getDetailsString("downlights", "Downlights : $800.00<br>") +
        getDetailsString("hot_water_system", "Hot Water System : $5000.00")
    ;
}

window.onload = function()
{
    update();
}