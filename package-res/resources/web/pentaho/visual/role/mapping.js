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
  "./attribute",
  "./level"
], function() {

  "use strict";

  return function(context) {

    var Complex = context.get("pentaho/type/complex");

    /**
     * @name pentaho.visual.role.Mapping.Type
     * @class
     * @extends pentaho.type.Complex.Type
     *
     * @classDesc The type class of {@link pentaho.visual.role.Mapping}.
     */

    /**
     * @name pentaho.visual.role.Mapping
     * @class
     * @extends pentaho.type.Complex
     * @abstract
     *
     * @amd {pentaho.type.Factory<pentaho.visual.role.Mapping>} pentaho/visual/role
     *
     * @classDesc The base abstract class of visual role mappings.
     *
     * This type is to be used as the type of _visual role_ properties
     * of a [visual model]{@link pentaho.visual.base.Model}.
     * It serves two main purposes:
     *
     * 1. Informing about the capabilities of a visual role of a visualization.
     * 2. Representing the mapping between a visual role and the data properties - here named "attributes" -
     *    of a visualization's current dataset.
     *
     * The first is achieved when defining a subtype of this one,
     * by configuring the type properties
     * [levels]{@link pentaho.visual.role.Mapping.Type#levels} and
     * [dataType]{@link pentaho.visual.role.Mapping.Type#dataType}.
     *
     * The second is achieved by creating a visual role mapping instance,
     * and specifying its properties
     * [level]{@link pentaho.visual.role.Mapping.Type#level} and
     * [attrs]{@link pentaho.visual.role.Mapping.Type#attrs}.
     *
     * The related type {@link pentaho.visual.role.MappingAttribute}
     * represents the association of the visual role with a single data property (or attribute).
     *
     * @description Creates a visual role mapping instance.
     * @constructor
     * @param {pentaho.visual.role.spec.UMapping} [spec] A visual role mapping specification.
     */
    var VisualRoleMapping = Complex.extend({

      /**
       * Gets the level of measurement in which the visual role will effectively be operating on,
       * according to the mapping's current state.
       *
       * When {@link pentaho.visual.role.Mapping#level} is not `null`,
       * that measurement level is returned.
       * Otherwise,
       * the value of {@link pentaho.visual.role.Mapping#levelAuto},
       * which can be `undefined`, is returned.
       *
       * A visualization should respect the value of this property and actually
       * operate the visual role in the corresponding mode.
       *
       * @type {!pentaho.visual.role.MeasurementLevel|undefined}
       * @readOnly
       */
      get levelEffective() {
        throw new Error("Implement me!");
      },

      /**
       * Gets or sets the fixed measurement level in which the visual role is to operate on.
       *
       * When `null`,
       * the visual role operates in the automatically determined measurement level,
       * as returned by {@link pentaho.visual.role.Mapping#levelAuto}.
       *
       * When specified,
       * it must be one of the measurement levels returned by
       * {@link pentaho.visual.role.Mapping.Type#levelsEffective},
       * or, otherwise, the mapping is considered _invalid_.
       *
       * This JS property is sugar for `this.get("level")` and `this.set("level", value)`.
       *
       * @type {pentaho.visual.role.MeasurementLevel}
       */
      get level() {
        return this.get("level");
      },
      set level(value) {
        this.set("level", value);
      },

      /**
       * Gets or sets the attributes of the visual role mapping.
       *
       * This JS property is sugar for
       * `this.get("attrs")` and `this.set("attrs", value)`.
       *
       * @type pentaho.type.List<pentaho.visual.role.MappingAttribute>
       */
      get attributes() {
        return this.get("attrs");
      },
      set attributes(value) {
        this.set("attrs", value);
      },

      /**
       * Gets the automatic measurement level.
       *
       * The automatic measurement level is determined based on the visual role's
       * [possible measurement levels]{@link pentaho.type.role.Mapping.Type#levelsEffective}
       * and the measurement levels supported by the currently mapped data properties.
       *
       * When the mapping is empty (has no mapped attributes),
       * `undefined` is returned.
       *
       * When the mapping is invalid, `undefined` is returned.
       *
       * When more than one measurement level could be used,
       * the _highest_ measurement level is preferred.
       *
       * @type {!pentaho.visual.role.MeasurementLevel|undefined}
       * @readOnly
       */
      get levelAuto() {
        throw new Error("Implement me!");
      },

      type: {
        // this is the main module of the package
        id: "pentaho/visual/role",

        isAbstract: true,

        props: [
          // TODO: discrete domain refinement
          {name: "level", type: "pentaho/visual/role/level"},

          {name: "attrs", type: ["pentaho/visual/role/attribute"]}
        ],

        //region levels
        // NOTE: See facets/DiscreteDomain#domain for a similar implementation.
        // "nominal", "ordinal", "quantitative"
        _levels: null,

        /**
         * Gets or sets the array of measurement levels for which the visual role
         * has a special mode of operation.
         *
         * A visual role that supports more than one measurement level is said to be **modal**.
         *
         * A non-abstract visual role needs to support at least one measurement level.
         *
         * ### This attribute is *Monotonic*
         *
         * The value of a _monotonic_ attribute can change, but only in some, predetermined _monotonic_ direction.
         *
         * In this case, a measurement level can be added to a visual role mapping,
         * but a supported one cannot be removed.
         *
         * ### This attribute is *Inherited*
         *
         * When there is no _local value_, the _effective value_ of the attribute is the _inherited effective value_.
         *
         * The first set local value must respect the _monotonicity_ property with the inherited value.
         *
         * ### Other characteristics
         *
         * When set to a {@link Nully} value, the set operation is ignored.
         *
         * When set and the type already has [subtypes]{@link pentaho.type.Type#hasDescendants},
         * an error is thrown.
         *
         * The root [visual.role.Mapping]{@link pentaho.visual.role.Mapping} has
         * a `levels` attribute which is an empty list.
         *
         * Do **NOT** modify the returned list or its elements in any way.
         *
         * @type {pentaho.type.List.<pentaho.visual.role.MeasurementLevel>}
         *
         * @throws {pentaho.lang.OperationInvalidError} When setting and the type already has
         * [subtypes]{@link pentaho.type.Type#hasDescendants}.
         */
        get levels() {
          throw new Error("Implement me!");
        },

        set levels(value) {
          throw new Error("Implement me!");
        },
        //endregion

        //region dataType
        _dataType: undefined,

        // NOTE: See Property.Type#type for a similar implementation.
        /**
         * Gets or sets the type of data properties required by the visual role.
         *
         * ### This attribute is *Monotonic*
         *
         * The value of a _monotonic_ attribute can change, but only in some, predetermined _monotonic_ direction.
         *
         * In this case, the attribute can only change to a
         * type that is a [subtype]{@link pentaho.type.Type#isSubtypeOf} of the attribute's current value,
         * or, otherwise, an error is thrown.
         *
         * ### This attribute is *Inherited*
         *
         * When there is no _local value_, the _effective value_ of the attribute is the _inherited effective value_.
         *
         * The first set local value must respect the _monotonicity_ property with the inherited value.
         *
         * ### Other characteristics
         *
         * When set and the visual role mapping already has [subtypes]{@link pentaho.type.Type#hasDescendants},
         * an error is thrown.
         *
         * When set to a {@link Nully} value, the set operation is ignored.
         *
         * Otherwise, the set value is assumed to be an [spec.UTypeReference]{@link pentaho.type.spec.UTypeReference}
         * and is first resolved using [this.context.get]{@link pentaho.type.Context#get}.
         *
         * The root [visual.role.Mapping]{@link pentaho.visual.role.Mapping} has
         * a `dataType` attribute of [value]{@link pentaho.type.Value}.

         * @type {!pentaho.type.Value.Type}
         *
         * @throws {pentaho.lang.OperationInvalidError} When setting and the visual role mapping
         * already has [subtypes]{@link pentaho.type.Type#hasDescendants}.
         *
         * @throws {pentaho.lang.ArgumentInvalidError} When setting to a _value type_ that is not a subtype
         * of the current _value type_.
         */
        get dataType() {
          throw new Error("Implement me!");
        },

        set dataType(value) {
          throw new Error("Implement me!");
        },
        //endregion

        /**
         * Gets the levels of measurement that are effectively supported by the visual role,
         * when both
         * the supported [levels]{@link pentaho.visual.role.Mapping#levels}
         * and the supported [dataType]{@link pentaho.visual.role.Mapping#dataType}
         * are considered together.
         *
         * Specifically, when the data type is not compatible with a certain level of measurement,
         * that level of measurement is removed from the result.
         * This attribute returns a subset of the list returned by the `levels` attribute.
         *
         * Do **NOT** modify the returned list or its elements in any way.
         *
         * The contents of this list could be displayed to a user for
         * him to choose one of the possible measurement levels.
         *
         * @type {pentaho.type.List.<pentaho.visual.role.MeasurementLevel>}
         * @readOnly
         */
        get levelsEffective() {
          // Compute and cache the result. Must be local cache, not inherited.
          // Invalidate local cache on _levels and _dataType change.
          throw new Error("Implement me!");
        }
      }
    });

    return VisualRoleMapping;
  };
});