import {useMutation, useQuery, useSubscription} from '@apollo/client';
import {getAccessToken} from '../auth';
import {ADD_MESSAGE_MUTATION, MESSAGES_QUERY, MESSAGE_ADDED_SUBSCRIPTION, ADD_USER_MUTATION} from './queries';

export function useAddUser() {
    const [mutate] = useMutation(ADD_USER_MUTATION);
    return {
        addUser: async (input) => {
            const {data: {user}} = await mutate({
                variables: {input: input},
                context: {
                    headers: {'Authorization': 'Bearer ' + getAccessToken()},
                }
            });
            return user;
        },
    };
}

export function useAddMessage() {
    const [mutate] = useMutation(ADD_MESSAGE_MUTATION);
    return {
        addMessage: async (text) => {
            const {data: {message}} = await mutate({
                variables: {input: {text}},
                context: {
                    headers: {'Authorization': 'Bearer ' + getAccessToken()},
                },
            });
            return message;
        },
    };
}

export function useMessages() {
    const {data} = useQuery(MESSAGES_QUERY, {
        context: {
            headers: {'Authorization': 'Bearer ' + getAccessToken()},
        },
    });
    useSubscription(MESSAGE_ADDED_SUBSCRIPTION, {
        onData: ({client, data}) => {
            const message = data.data.message;
            client.cache.updateQuery({query: MESSAGES_QUERY}, ({messages}) => {
                return {messages: [...messages, message]};
            });
        },
    });
    return {
        messages: data?.messages ?? [],
    };
}
