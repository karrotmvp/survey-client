import { Navigator, Screen } from '@karrotframe/navigator'

import CreatePage from '../page/CreatePage'
import HomePage from '../page/HomePage'

export default function Router() {
    return (
        <Navigator>
            <Screen path="/">
                <HomePage/>
            </Screen>
            <Screen path="/create">
                <CreatePage/>
            </Screen>
            <Screen path="/create/short-answer">
                <CreatePage/>
            </Screen>
            <Screen path="/create/choice-answer">
                <CreatePage/>
            </Screen>
        </Navigator>
    )
}
