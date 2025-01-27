const graph = {
  id: 'demo@0.1.0',
  nodes: {
    '260': {
      id: 260,
      data: {
        name: 'Output',
        sendToPlaytest: true,
        sendToAvatar: false,
        socketKey: 'faedf39a-0504-4da7-91f4-9a8118fb8248',
        dataControls: {
          name: { expanded: true },
          sendToPlaytest: { expanded: true },
          sendToAvatar: { expanded: true },
        },
        success: false,
        error: false,
      },
      inputs: {
        trigger: {
          connections: [
            { node: 261, output: 'trigger', data: { hello: 'hello' } },
          ],
        },
        input: {
          connections: [
            { node: 261, output: 'composed', data: { hello: 'hello' } },
          ],
        },
      },
      outputs: {
        trigger: {
          connections: [
            { node: 286, input: 'trigger', data: { hello: 'hello' } },
          ],
        },
        output: {
          connections: [
            { node: 379, input: 'content', data: { hello: 'hello' } },
          ],
        },
      },
      position: [1113.9956616232623, -32.49936009181222],
      name: 'Output',
    },
    '261': {
      id: 261,
      data: {
        stop: '###,\\n',
        temperature: 0.7,
        max_tokens: 50,
        frequency_penalty: 0,
        dataControls: {
          modelName: { expanded: true },
          inputs: { expanded: true },
          fewshot: { expanded: true },
          temperature: { expanded: true },
          max_tokens: { expanded: true },
          frequency_penalty: { expanded: true },
          presence_penalty: { expanded: true },
          stop: { expanded: true },
        },
        fewshot:
          'The following is a conversation between {{speakerName}} and {{agentName}}. {{agentName}} is a helpful chatbot.\n{{conversation}}\n{{speakerName}}: {{input}}\n{{agentName}}:',
        inputs: [
          {
            name: 'input',
            taskType: 'output',
            socketKey: 'input',
            connectionType: 'input',
            socketType: 'anySocket',
          },
          {
            name: 'conversation',
            taskType: 'output',
            socketKey: 'conversation',
            connectionType: 'input',
            socketType: 'anySocket',
          },
          {
            name: 'speakerName',
            taskType: 'output',
            socketKey: 'speakerName',
            connectionType: 'input',
            socketType: 'anySocket',
          },
          {
            name: 'agentName',
            taskType: 'output',
            socketKey: 'agentName',
            connectionType: 'input',
            socketType: 'anySocket',
          },
        ],
        modelName: 'text-ada-001',
        error: false,
        success: false,
        presence_penalty: 0,
      },
      inputs: {
        input: {
          connections: [
            { node: 317, output: 'content', data: { hello: 'hello' } },
          ],
        },
        conversation: {
          connections: [
            { node: 378, output: 'conversation', data: { hello: 'hello' } },
          ],
        },
        speakerName: {
          connections: [
            { node: 317, output: 'sender', data: { hello: 'hello' } },
          ],
        },
        agentName: {
          connections: [
            { node: 317, output: 'observer', data: { hello: 'hello' } },
          ],
        },
        trigger: {
          connections: [
            { node: 288, output: 'trigger', data: { hello: 'hello' } },
          ],
        },
      },
      outputs: {
        trigger: {
          connections: [
            { node: 260, input: 'trigger', data: { hello: 'hello' } },
          ],
        },
        result: { connections: [] },
        composed: {
          connections: [
            { node: 260, input: 'input', data: { hello: 'hello' } },
          ],
        },
      },
      position: [773.0373737573882, -6.885085295757591],
      name: 'Generator',
    },
    '286': {
      id: 286,
      data: {
        success: false,
        dataControls: { name: { expanded: true }, type: { expanded: true } },
        name: 'conversation',
        type: 'conversation',
        error: false,
      },
      inputs: {
        trigger: {
          connections: [
            { node: 260, output: 'trigger', data: { hello: 'hello' } },
          ],
        },
        content: {
          connections: [
            { node: 317, output: 'content', data: { hello: 'hello' } },
          ],
        },
        event: {
          connections: [
            { node: 418, output: 'output', data: { hello: 'hello' } },
          ],
        },
        embedding: { connections: [] },
      },
      outputs: {
        trigger: {
          connections: [
            { node: 379, input: 'trigger', data: { hello: 'hello' } },
          ],
        },
      },
      position: [1503.6795650081237, -24.768506315340684],
      name: 'Store Event',
    },
    '288': {
      id: 288,
      data: {
        max_count: '6',
        dataControls: {
          name: { expanded: true },
          type: { expanded: true },
          max_count: { expanded: true },
        },
        name: 'conversation',
        type: 'conversation',
        success: false,
        error: false,
      },
      inputs: {
        trigger: {
          connections: [
            { node: 317, output: 'trigger', data: { hello: 'hello' } },
          ],
        },
        event: {
          connections: [
            { node: 418, output: 'output', data: { hello: 'hello' } },
          ],
        },
        embedding: { connections: [] },
      },
      outputs: {
        trigger: {
          connections: [
            { node: 261, input: 'trigger', data: { hello: 'hello' } },
          ],
        },
        events: {
          connections: [
            { node: 378, input: 'events', data: { hello: 'hello' } },
          ],
        },
      },
      position: [8.406780587163269, 5.003741393630614],
      name: 'Event Recall',
    },
    '317': {
      id: 317,
      data: {
        socketKey: '6fc09be7-92d9-45c5-af9c-7d669d5c7664',
        success: false,
      },
      inputs: {
        trigger: {
          connections: [
            { node: 418, output: 'trigger', data: { hello: 'hello' } },
          ],
        },
        event: {
          connections: [
            { node: 418, output: 'output', data: { hello: 'hello' } },
          ],
        },
      },
      outputs: {
        trigger: {
          connections: [
            { node: 288, input: 'trigger', data: { hello: 'hello' } },
          ],
        },
        agentId: { connections: [] },
        content: {
          connections: [
            { node: 261, input: 'input', data: { hello: 'hello' } },
            { node: 286, input: 'content', data: { hello: 'hello' } },
          ],
        },
        client: { connections: [] },
        channel: { connections: [] },
        channelType: { connections: [] },
        entities: { connections: [] },
        projectId: { connections: [] },
        observer: {
          connections: [
            { node: 261, input: 'agentName', data: { hello: 'hello' } },
          ],
        },
        sender: {
          connections: [
            { node: 261, input: 'speakerName', data: { hello: 'hello' } },
          ],
        },
      },
      position: [-351.7287822276103, -18.00802946009783],
      name: 'Event Destructure',
    },
    '378': {
      id: 378,
      data: { success: false },
      inputs: {
        events: {
          connections: [
            { node: 288, output: 'events', data: { hello: 'hello' } },
          ],
        },
      },
      outputs: {
        conversation: {
          connections: [
            { node: 261, input: 'conversation', data: { hello: 'hello' } },
          ],
        },
      },
      position: [385.9205728014596, -13.954538944883438],
      name: 'Events to Conversation',
    },
    '379': {
      id: 379,
      data: {
        error: false,
        success: false,
        dataControls: { name: { expanded: true }, type: { expanded: true } },
        name: 'conversation',
        type: 'conversation',
      },
      inputs: {
        trigger: {
          connections: [
            { node: 286, output: 'trigger', data: { hello: 'hello' } },
          ],
        },
        content: {
          connections: [
            { node: 260, output: 'output', data: { hello: 'hello' } },
          ],
        },
        event: {
          connections: [
            { node: 418, output: 'output', data: { hello: 'hello' } },
          ],
        },
        embedding: { connections: [] },
      },
      outputs: { trigger: { connections: [] } },
      position: [1874.2849514671577, -24.890813076678157],
      name: 'Store Event',
    },
    '388': {
      id: 388,
      data: {
        isInput: true,
        name: 'Input - Discord (Text)',
        useDefault: false,
        defaultValue: 'Hello world',
        socketKey: '2255eef5-2b18-4f0f-b0f5-1c8fb8e347f7',
        text: {
          spellName: 'Discord Example',
          id: '4305e4af-f91d-4869-b570-f317c1ed9058',
          projectId: 'bb1b3d24-84e0-424e-b4f1-57603f307a89',
          inputs: {
            'Input - Discord (Voice)': {
              content: 'hello',
              sender: 'playtestSender',
              observer: 'Agent',
              agentId: 'preview',
              client: 'playtest',
              channel: 'playtest',
              projectId: 'bb1b3d24-84e0-424e-b4f1-57603f307a89',
              channelType: 'playtest',
              type: 'playtest',
              entities: ['playtestSender', 'Agent'],
            },
          },
          publicVariables: '[]',
          secrets: {},
        },
        success: false,
        dataControls: {
          inputType: { expanded: true },
          useDefault: { expanded: true },
          defaultValue: { expanded: true },
        },
        inputType: 'Discord (Text)',
      },
      inputs: {},
      outputs: {
        trigger: {
          connections: [
            { node: 418, input: 'text trigger', data: { hello: 'hello' } },
          ],
        },
        output: {
          connections: [
            { node: 418, input: 'text data', data: { hello: 'hello' } },
          ],
        },
      },
      position: [-1081.428534649755, -1.7585139444544495],
      name: 'Input',
    },
    '417': {
      id: 417,
      data: {
        isInput: true,
        name: 'Input - Discord (Voice)',
        useDefault: false,
        defaultValue: 'Hello world',
        socketKey: '5907593e-a177-4123-8fa8-d743d60ed342',
        dataControls: {
          inputType: { expanded: true },
          useDefault: { expanded: true },
          defaultValue: { expanded: true },
        },
        inputType: 'Discord (Voice)',
        text: {
          spellName: 'Discord Example',
          id: '4305e4af-f91d-4869-b570-f317c1ed9058',
          projectId: 'bb1b3d24-84e0-424e-b4f1-57603f307a89',
          inputs: {
            'Input - Discord (Voice)': {
              content: 'hello',
              sender: 'playtestSender',
              observer: 'Agent',
              agentId: 'preview',
              client: 'playtest',
              channel: 'playtest',
              projectId: 'bb1b3d24-84e0-424e-b4f1-57603f307a89',
              channelType: 'playtest',
              type: 'playtest',
              entities: ['playtestSender', 'Agent'],
            },
          },
          publicVariables: '[]',
          secrets: {},
        },
        success: false,
      },
      inputs: {},
      outputs: {
        trigger: {
          connections: [
            { node: 418, input: 'voice trigger', data: { hello: 'hello' } },
          ],
        },
        output: {
          connections: [
            { node: 418, input: 'voice data', data: { hello: 'hello' } },
          ],
        },
      },
      position: [-1077.3249707945567, 209.8951202273657],
      name: 'Input',
    },
    '418': {
      id: 418,
      data: {
        dataControls: { inputs: { expanded: true } },
        inputs: [
          {
            name: 'text trigger',
            taskType: 'option',
            socketKey: 'text trigger',
            connectionType: 'input',
            socketType: 'triggerSocket',
          },
          {
            name: 'text data',
            taskType: 'output',
            socketKey: 'text data',
            connectionType: 'input',
            socketType: 'anySocket',
          },
          {
            name: 'voice trigger',
            taskType: 'option',
            socketKey: 'voice trigger',
            connectionType: 'input',
            socketType: 'triggerSocket',
          },
          {
            name: 'voice data',
            taskType: 'output',
            socketKey: 'voice data',
            connectionType: 'input',
            socketType: 'anySocket',
          },
        ],
        success: false,
      },
      inputs: {
        'text trigger': {
          connections: [
            { node: 388, output: 'trigger', data: { hello: 'hello' } },
          ],
        },
        'text data': {
          connections: [
            { node: 388, output: 'output', data: { hello: 'hello' } },
          ],
        },
        'voice trigger': {
          connections: [
            { node: 417, output: 'trigger', data: { hello: 'hello' } },
          ],
        },
        'voice data': {
          connections: [
            { node: 417, output: 'output', data: { hello: 'hello' } },
          ],
        },
      },
      outputs: {
        trigger: {
          connections: [
            { node: 317, input: 'trigger', data: { hello: 'hello' } },
          ],
        },
        output: {
          connections: [
            { node: 317, input: 'event', data: { hello: 'hello' } },
            { node: 288, input: 'event', data: { hello: 'hello' } },
            { node: 286, input: 'event', data: { hello: 'hello' } },
            { node: 379, input: 'event', data: { hello: 'hello' } },
          ],
        },
      },
      position: [-712.1918012213798, 3.596469524117472],
      name: 'Exclusive Gate',
    },
  },
  comments: [
    {
      text: 'Prompt template and GPT-3 completion',
      position: [721.796330053565, -87.95492558011667],
      links: [261],
      type: 'frame',
      width: 300.9999999999999,
      height: 359,
    },
    {
      text: 'recall the last 6 conversation events',
      position: [-32.644720754678026, -71.91190165739141],
      links: [288],
      type: 'frame',
      width: 301,
      height: 266,
    },
    {
      text: 'format the events into a conversation script',
      position: [348.6576362977702, -92.22722244220095],
      links: [289, 318, 378],
      type: 'frame',
      width: 301,
      height: 179,
    },
    {
      text: 'Respond with the output',
      position: [1097.6646843137023, -95.95149005277733],
      links: [260],
      type: 'frame',
      width: 301,
      height: 230,
    },
    {
      text: 'store the input from sender',
      position: [1462.4918444086727, -93.14081431629018],
      links: [286],
      type: 'frame',
      width: 301,
      height: 302,
    },
    {
      text: 'store the response from api',
      position: [1833.6116971958797, -89.30901586253435],
      links: [291, 319, 379],
      type: 'frame',
      width: 301,
      height: 302,
    },
    {
      text: 'Break out the event to get the inner fields',
      position: [-400.22581737165865, -72.69227958005936],
      links: [317],
      type: 'frame',
      width: 301,
      height: 518,
    },
    {
      text: 'first in gets handled',
      position: [-758.4320684099528, -69.10810048805959],
      links: [418],
      type: 'frame',
      width: 302,
      height: 304,
    },
    {
      text: 'input',
      position: [-1121.8979788311847, -69.14012304787181],
      links: [417, 388],
      type: 'frame',
      width: 304.3241457459012,
      height: 456.8949592747954,
    },
  ],
}

export default graph
