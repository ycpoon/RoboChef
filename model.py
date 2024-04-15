######################################################################################################
# In this section, we set the user authentication, user and app ID, model details, and the location
# of the image we want as an input. Change these strings to run your own example.
#####################################################################################################

from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import resources_pb2, service_pb2, service_pb2_grpc
from clarifai_grpc.grpc.api.status import status_code_pb2
import requests
from io import BytesIO

def send_IMG_request(image_url:str):
    "Sends a request to Clarifai through API with the current Filename. File must be in same folder as script"
    # Your PAT (Personal Access Token) can be found in the portal under Authentification
    PAT = 'a3b992f286c346cba91d70eb7be27532'
    # Specify the correct user_id/app_id pairings
    # Since you're making inferences outside your app's scope
    USER_ID = 'clarifai'
    APP_ID = 'main'
    # Change these to whatever model and image URL you want to use
    MODEL_ID = 'food-item-recognition'
    MODEL_VERSION_ID = '1d5fd481e0cf4826aa72ec3ff049e044'
    # IMAGE_FILE_LOCATION = Filename

    ############################################################################
    # YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ############################################################################

    channel = ClarifaiChannel.get_grpc_channel()
    stub = service_pb2_grpc.V2Stub(channel)

    metadata = (('authorization', 'Key ' + PAT),)

    userDataObject = resources_pb2.UserAppIDSet(user_id=USER_ID, app_id=APP_ID)

    response = requests.get(image_url)
    file_bytes = BytesIO(response.content).read()

    post_model_outputs_response = stub.PostModelOutputs(
        service_pb2.PostModelOutputsRequest(
            user_app_id=userDataObject,  # The userDataObject is created in the overview and is required when using a PAT
            model_id=MODEL_ID,
            version_id=MODEL_VERSION_ID,  # This is optional. Defaults to the latest model version
            inputs=[
                resources_pb2.Input(
                    data=resources_pb2.Data(
                        image=resources_pb2.Image(
                            base64=file_bytes
                        )
                    )
                )
            ]
        ),
        metadata=metadata
    )
    if post_model_outputs_response.status.code != status_code_pb2.SUCCESS:
        print(post_model_outputs_response.status)
        raise Exception("Post model outputs failed, status: " + post_model_outputs_response.status.description)

    # Since we have one input, one output will exist here
    output = post_model_outputs_response.outputs[0]

    print("Predicted concepts:")

    returnNames90 = []
    allNames = []
    
    for concept in output.data.concepts:
        print("%s %.2f" % (concept.name, concept.value))
    
        allNames.append(concept.name)
        if concept.value > 0.9:
            returnNames90.append(concept.name)
    
    topTwo= allNames[0:2]
    if len(returnNames90) == 0:
        return ' '.join(topTwo)
    else:
        return ' '.join(returnNames90)

# image_url = "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8fA%3D%3D"
# print(send_IMG_request(image_url))
