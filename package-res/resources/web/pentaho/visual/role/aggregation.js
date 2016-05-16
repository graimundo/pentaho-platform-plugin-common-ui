/*!
 * Copyright 2010 - 2016 Pentaho Corporation. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define([
  "module",
  "pentaho/i18n!messages"
], function(module, bundle) {

  "use strict";

  return function(context) {

    var Refinement = context.get("refinement");

    /**
     * @name pentaho.visual.role.Aggregation
     * @class
     * @extends pentaho.type.String
     *
     * @amd {pentaho.type.Factory<pentaho.visual.role.Aggregation>} pentaho/visual/role/aggregation
     *
     * @classDesc The `Aggregation` class is **a refinement of** the
     * [String]{@link pentaho.type.String} simple type that represents an **aggregation** operation.
     *
     * Currently, the following aggregations are supported:
     *
     * * `sum` - Sum
     * * `avg` - Average
     * * `min` - Minimum
     * * `max` - Maximum
     */
    return Refinement.extend("pentaho.visual.role.Aggregation", {
      type: {
        id: module.id,
        of: "string",
        facets: ["DiscreteDomain"],
        domain: ["sum", "avg", "min", "max"]
      }
    })
    .implement({type: bundle.structured.aggregation});
  };
});