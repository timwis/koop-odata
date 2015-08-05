# OData Interface for [Koop](https://github.com/koopjs/koop)
This plugin makes it possible to interact with Koop's [many providers](https://github.com/koopjs/koopjs.github.io/blob/master/docs/providers.md)
using an [OData-compliant API](http://www.odata.org/).

**Note:** This plugin only works when used with these versions of [koop](https://github.com/timwis/koop) and [koop-ckan](https://github.com/timwis/koop-ckan). They've been submitted as pull requests, so this plugin is more of a proof of concept until they're merged.

# Installation
```bash
npm install koop-odata
```

# Registering the plugin
To use this plugin in your koop instance, register it the same way you'd register providers as demonstrated in
[koop's documentation](https://github.com/koopjs/koop#registering-providers)

```javascript
koop.register(odata);
```

# Usage
Append `/odata` to your normal query to interact with the resource with an OData API, for instance:

`http://localhost:1337/ckan/phl/heart-healthy-screening-sites/odata?&$filter=ZIP_CODE%20eq%2019146`

will produce an OData XML object like:

```xml
<d>
	<properties>
		<_id>4</_id>
		<﻿X>-75.17548258333102</﻿X>
		<Y>39.94122652163324</Y>
		<OBJECTID>4</OBJECTID>
		<DATE_>2015-04-06T00:00:00</DATE_>
		<TIME>10:30 AM - 12 PM</TIME>
		<ADDRESS>1941 Christian Street</ADDRESS>
		<LOCATION />
		<CITY>Philadelphia</CITY>
		<STATE>PA</STATE>
		<ZIP_CODE>19146</ZIP_CODE>
		<SCREENING_TYPE>Blood Pressure Only</SCREENING_TYPE>
		<CONTACT_INFORMATION>Contact Jefferson University Hospital - Blood Pressure Plus</CONTACT_INFORMATION>
		<PHONE_NUMBER>215-955-3817</PHONE_NUMBER>
	</properties>
</d>
```

# Supported
* `$filter=` with eq, ne, lt, le, gt, ge, and, or

# Unsupported
* `$select=` (requires more significant changes to koop codebase)
* `$top=` (requires more significant changes to koop codebase)
* `$skip=` (requires more significant changes to koop codebase)
* Individual resources, ie `People('johndoe')`
* Probably other methods that just haven't been coded yet