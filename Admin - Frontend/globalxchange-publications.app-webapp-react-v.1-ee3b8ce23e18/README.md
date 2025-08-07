# Individial List Functions.

- pass the grid column widths that you want via conditionalResposiveView
- then change the data in headerSection, contentSection & loadingSection functions as per design.
  it will autometically be responsive.
- conditionalResposiveView function is responsible for mobile optimizing the page.
  If you wanna change anything related to resposive resign look in that function

```
    {conditionalResposiveView(
        allBrands,
        loading,
        "2fr 1.8fr 2fr 1fr 1fr 0.3fr", // Desktop view Grid columns
        "300px 200px 300px 200px 100px 50px" // Mobile view Grid columns
    )}
```
