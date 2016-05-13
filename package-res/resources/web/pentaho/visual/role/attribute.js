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
  "./aggregation"
], function(module) {

  "use strict";

  return function(context) {

    var Complex = context.get("pentaho/type/complex");

    return Complex.extend({
      // How I wish...
      //get uniqueConstraintKey() {
      //  return [this.getv("aggr"), this.getv("name")];
      //},

      type: {
        id: module.id,
        props: [
          {name: "name", type: "string", isRequired: true},

          // TODO: discrete domain refinement
          {name: "aggr", type: "pentaho/visual/role/aggregation", value: "sum"},

          {name: "isReverse", type: "boolean", value: false}
        ]
      }
    });
  };
});