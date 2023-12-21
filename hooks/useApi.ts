import { useEffect, useState } from 'react';

type ApiResponse<T> =
    | {
          //pending
          data: undefined;
          isLoading: true;
          isError: false;
      }
    | {
          // fulfilled
          data: T;
          isLoading: false;
          isError: false;
      }
    | {
          //rejected
          data: undefined;
          isLoading: false;
          isError: true;
      };

export const useApi = <T>(source: string | (() => Promise<Response>)) => {
    const [apiResponse, setApiResponse] = useState<ApiResponse<T>>({
        data: undefined,
        isLoading: true,
        isError: false,
    });

    useEffect(() => {
        const BASE_URL = process.env.NEXT_PUBLIC_AIRTABLE_BASE_URL;

        const loadData = async () => {
            console.log('hello from useApi');
            try {
                let response: Response;
                if (typeof source === 'string') {
                    response = await fetch(`${BASE_URL}${source}`, {
                        headers: {
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN}`,
                            'content-type': 'application/json',
                        },
                    });
                } else {
                    response = await source();
                }

                if (!response.ok) {
                    console.log('response not ok');
                    setApiResponse({
                        data: undefined,
                        isLoading: false,
                        isError: true,
                    });
                }
                const responseData = (await response.json()) as T;
                setApiResponse({
                    data: responseData,
                    isLoading: false,
                    isError: false,
                });
            } catch (error) {
                console.log('Something went wrong ! ', error);
            }
        };

        void loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return apiResponse;
};
