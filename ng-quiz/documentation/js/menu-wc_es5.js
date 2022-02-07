'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  _inherits(_class, _HTMLElement);

  var _super = _createSuper(_class);

  function _class() {
    var _this;

    _classCallCheck(this, _class);

    _this = _super.call(this);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }

  _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">ng-quiz documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"overview.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>README\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter modules\">\n                        <a data-type=\"chapter-link\" href=\"modules.html\">\n                            <div class=\"menu-toggler linked\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"', ">\n                                <span class=\"icon ion-ios-archive\"></span>\n                                <span class=\"link-name\">Modules</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                        </a>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"', ">\n                            <li class=\"link\">\n                                <a href=\"modules/AppModule.html\" data-type=\"entity-link\" >AppModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#components-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"' : 'data-target="#xs-components-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"' : 'id="xs-components-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/AccountComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AccountComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/AddAnswerDialogComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AddAnswerDialogComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/AddQuestionDialogComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AddQuestionDialogComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/AdminComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AdminComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/AppComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AppComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/AuthComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AuthComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/CategoryDialogComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >CategoryDialogComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/CourseDialogComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >CourseDialogComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/DialogComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >DialogComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/EditAnswerDialogComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >EditAnswerDialogComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/ErrorPageComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ErrorPageComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/FaqComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >FaqComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/GameComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >GameComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/HeaderComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >HeaderComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/HomeComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >HomeComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/LoadingScreenComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >LoadingScreenComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/LobbyComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >LobbyComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/QuestionDialogComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >QuestionDialogComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/QuestionsComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >QuestionsComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/RankingComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >RankingComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/UserEditComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >UserEditComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#directives-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"' : 'data-target="#xs-directives-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"', ">\n                                        <span class=\"icon ion-md-code-working\"></span>\n                                        <span>Directives</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="directives-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"' : 'id="xs-directives-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"', ">\n                                        <li class=\"link\">\n                                            <a href=\"directives/AutofocusDirective.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AutofocusDirective</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#pipes-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"' : 'data-target="#xs-pipes-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"', ">\n                                            <span class=\"icon ion-md-add\"></span>\n                                            <span>Pipes</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="pipes-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"' : 'id="xs-pipes-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"', ">\n                                            <li class=\"link\">\n                                                <a href=\"pipes/AccountLevelPipe.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AccountLevelPipe</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/AppRoutingModule.html\" data-type=\"entity-link\" >AppRoutingModule</a>\n                            </li>\n                </ul>\n                </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"', ">\n                            <span class=\"icon ion-ios-paper\"></span>\n                            <span>Classes</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"', ">\n                            <li class=\"link\">\n                                <a href=\"classes/User.html\" data-type=\"entity-link\" >User</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/AnswerService.html\" data-type=\"entity-link\" >AnswerService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/AuthService.html\" data-type=\"entity-link\" >AuthService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/CategoryService.html\" data-type=\"entity-link\" >CategoryService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/CourseService.html\" data-type=\"entity-link\" >CourseService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/LoadingScreenService.html\" data-type=\"entity-link\" >LoadingScreenService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/LobbyService.html\" data-type=\"entity-link\" >LobbyService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/QuestionsService.html\" data-type=\"entity-link\" >QuestionsService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/QuizService.html\" data-type=\"entity-link\" >QuizService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/RankingService.html\" data-type=\"entity-link\" >RankingService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/UserService.html\" data-type=\"entity-link\" >UserService</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#interceptors-links"' : 'data-target="#xs-interceptors-links"', ">\n                            <span class=\"icon ion-ios-swap\"></span>\n                            <span>Interceptors</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interceptors/LoadingScreenInterceptor.html\" data-type=\"entity-link\" >LoadingScreenInterceptor</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#guards-links"' : 'data-target="#xs-guards-links"', ">\n                            <span class=\"icon ion-ios-lock\"></span>\n                            <span>Guards</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"', ">\n                            <li class=\"link\">\n                                <a href=\"guards/AuthGuard.html\" data-type=\"entity-link\" >AuthGuard</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/Answer.html\" data-type=\"entity-link\" >Answer</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Category.html\" data-type=\"entity-link\" >Category</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Course.html\" data-type=\"entity-link\" >Course</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/DialogData.html\" data-type=\"entity-link\" >DialogData</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Player2.html\" data-type=\"entity-link\" >Player2</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Question.html\" data-type=\"entity-link\" >Question</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/QuestionList.html\" data-type=\"entity-link\" >QuestionList</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Quiz.html\" data-type=\"entity-link\" >Quiz</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Ranking.html\" data-type=\"entity-link\" >Ranking</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Users.html\" data-type=\"entity-link\" >Users</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/functions.html\" data-type=\"entity-link\">Functions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/variables.html\" data-type=\"entity-link\">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <a data-type=\"chapter-link\" href=\"routes.html\"><span class=\"icon ion-ios-git-branch\"></span>Routes</a>\n                        </li>\n                    <li class=\"chapter\">\n                        <a data-type=\"chapter-link\" href=\"coverage.html\"><span class=\"icon ion-ios-stats\"></span>Documentation coverage</a>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);

  return _class;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));