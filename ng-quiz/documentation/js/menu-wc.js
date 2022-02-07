'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ng-quiz documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"' : 'data-target="#xs-components-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"' :
                                            'id="xs-components-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"' }>
                                            <li class="link">
                                                <a href="components/AccountComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddAnswerDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddAnswerDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddQuestionDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddQuestionDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AuthComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategoryDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CourseDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditAnswerDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditAnswerDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErrorPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FaqComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FaqComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GameComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GameComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoadingScreenComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoadingScreenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LobbyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LobbyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuestionDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuestionDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuestionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuestionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RankingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RankingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserEditComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"' : 'data-target="#xs-directives-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"' :
                                        'id="xs-directives-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"' }>
                                        <li class="link">
                                            <a href="directives/AutofocusDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AutofocusDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"' : 'data-target="#xs-pipes-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"' :
                                            'id="xs-pipes-links-module-AppModule-c85d85457594571cc762afbe03d2c234abd08a07b6501090351da387b4e1f9bcbcf6ce8fbfae8f4ad51e59c2cfe265cfee1efd917bb68f2441ec1c23c496dac4"' }>
                                            <li class="link">
                                                <a href="pipes/AccountLevelPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountLevelPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AnswerService.html" data-type="entity-link" >AnswerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryService.html" data-type="entity-link" >CategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CourseService.html" data-type="entity-link" >CourseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoadingScreenService.html" data-type="entity-link" >LoadingScreenService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LobbyService.html" data-type="entity-link" >LobbyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuestionsService.html" data-type="entity-link" >QuestionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuizService.html" data-type="entity-link" >QuizService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RankingService.html" data-type="entity-link" >RankingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/LoadingScreenInterceptor.html" data-type="entity-link" >LoadingScreenInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Answer.html" data-type="entity-link" >Answer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Course.html" data-type="entity-link" >Course</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogData.html" data-type="entity-link" >DialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Player2.html" data-type="entity-link" >Player2</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Question.html" data-type="entity-link" >Question</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QuestionList.html" data-type="entity-link" >QuestionList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Quiz.html" data-type="entity-link" >Quiz</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Ranking.html" data-type="entity-link" >Ranking</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Users.html" data-type="entity-link" >Users</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});