import React, { useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import {routes} from './routes';
import requireLogin from './requireLogin';


const GLOBAL_GUARDS = [requireLogin];

const Router = ({ children }) => {
    const aRoutes = useMemo(() => routes, []);
    return (
        <GuardProvider guards={GLOBAL_GUARDS} loading={''} error={''}>
            <Route
                render={routeProps =>
                    children(
                        <Switch>
                            {aRoutes.map(({ component, error, exact, ignoreGlobal, loading, meta, path }, i) => (
                                <GuardedRoute
                                    key={i}
                                    component={component}
                                    exact={exact}
                                    error={error}
                                    ignoreGlobal={ignoreGlobal}
                                    loading={loading}
                                    meta={meta}
                                    path={path}
                                />
                            ))}
                        </Switch>,
                        routeProps,
                    )
                }
            />
        </GuardProvider>
    );
};

export default Router;
