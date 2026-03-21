'use client';

import { useState } from 'react';

interface Model {
  name: string;
  params: string;
  inferenceTime: string;
  proofSize: string;
  pricePerInference: string;
}

interface Task {
  id: string;
  type: 'classification' | 'regression' | 'nlp' | 'image';
  description: string;
  input: string;
  output?: string;
  verified: boolean;
  proofUrl?: string;
}

const models: Model[] = [
  {
    name: 'BERT-Base (13B)',
    params: '13B',
    inferenceTime: '12s',
    proofSize: '185 KB',
    pricePerInference: '$0.45',
  },
  {
    name: 'GPT-2 XL (1.5B)',
    params: '1.5B',
    inferenceTime: '3s',
    proofSize: '42 KB',
    pricePerInference: '$0.08',
  },
  {
    name: 'ResNet-50 (Image)',
    params: '98M',
    inferenceTime: '2.5s',
    proofSize: '38 KB',
    pricePerInference: '$0.05',
  },
  {
    name: 'Stable Diffusion XL',
    params: '6.6B',
    inferenceTime: '8s',
    proofSize: '127 KB',
    pricePerInference: '$1.20',
  },
  {
    name: 'Llama-3-8B (Quantized)',
    params: '8B',
    inferenceTime: '5s',
    proofSize: '89 KB',
    pricePerInference: '$0.18',
  },
];

const tasks: Task[] = [
  {
    id: '1',
    type: 'nlp',
    description: 'Sentiment Analysis',
    input: '"The new AI agent platform is revolutionizing development workflows!"',
  },
  {
    id: '2',
    type: 'classification',
    description: 'Image Classification',
    input: 'Input: 🚀 rocket emoji\nExpected: "space"',
  },
  {
    id: '3',
    type: 'regression',
    description: 'Price Prediction',
    input: '"ETH price in 24h based on current trend"',
  },
  {
    id: '4',
    type: 'image',
    description: 'Style Transfer',
    input: '"Convert image to cyberpunk style"',
  },
];

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<Model>(models[0]);
  const [selectedTask, setSelectedTask] = useState<Task>(tasks[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [proofResult, setProofResult] = useState<string | null>(null);

  const runInference = async () => {
    setIsProcessing(true);
    setResult(null);
    setProofResult(null);

    await new Promise(r => setTimeout(r, 1500));

    if (selectedTask.type === 'nlp') {
      setResult('"Positive sentiment detected - 94% confidence!"');
      setProofResult('ZK Proof (185 KB)\nProver: 0x7a...9f2e\nVerifier: 0x3c...1d4a\nProof validity: ✓ TRUE\nInput verified: ✓ MATCH');
    } else if (selectedTask.type === 'classification') {
      setResult('"space"');
      setProofResult('ZK Proof (42 KB)\nInput: rocket emoji\nOutput: space\nVerification: ✓ PASS');
    } else if (selectedTask.type === 'regression') {
      setResult('$2,450.32 ± $87.50 (24h forecast)');
      setProofResult('ZK Proof (38 KB)\nPrediction: $2,450.32\nError bounds: ±$87.50\nStatistical validity: ✓ VERIFIED');
    } else {
      setResult('"Cyberpunk style applied successfully"');
      setProofResult('ZK Proof (127 KB)\nStyle transfer completed\nImage hash verified: ✓ MATCH');
    }

    setIsProcessing(false);
  };

  const verifyProof = () => {
    if (!selectedTask.output) return;

    setProofResult(
      `ZK Proof Verification Results:\n\n` +
      `Model: ${selectedModel.name}\n` +
      `Task: ${selectedTask.description}\n` +
      `Input: ${selectedTask.input}\n` +
      `Output: ${selectedTask.output}\n` +
      `\n` +
      `Proof: Valid ✓\n` +
      `Integrity: Verified ✓\n` +
      `All outputs match inputs ✓`
    );
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b-4 border-cyan-400 bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black">ZKML Inference</h1>
          <p className="text-gray-400 mt-2">Run AI models with zero-knowledge privacy guarantees</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 border-4 border-cyan-400 p-4 text-center">
            <div className="text-3xl font-black text-cyan-400">5</div>
            <div className="text-sm text-gray-400">Models</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">185 KB</div>
            <div className="text-sm text-gray-400">Min Proof Size</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">12s</div>
            <div className="text-sm text-gray-400">Fastest Inference</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">$0.05</div>
            <div className="text-sm text-gray-400">Cheapest Model</div>
          </div>
        </section>

        {/* Model Selection */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">Select Model</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {models.map((model, i) => (
              <div
                key={model.name}
                onClick={() => setSelectedModel(model)}
                className={`p-4 border-4 cursor-pointer transition-all ${
                  selectedModel.name === model.name
                    ? 'bg-cyan-900/30 border-cyan-400'
                    : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="font-bold text-cyan-400">{model.name}</div>
                <div className="text-sm text-gray-400 mt-1">{model.params} parameters</div>
                <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                  <div>
                    <div className="text-gray-400">Time</div>
                    <div>{model.inferenceTime}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Proof</div>
                    <div>{model.proofSize}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Price</div>
                    <div>{model.pricePerInference}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Task Selection */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">Select Task</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {tasks.map((task, i) => (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className={`p-4 border-4 cursor-pointer transition-all ${
                  selectedTask.id === task.id
                    ? 'bg-cyan-900/30 border-cyan-400'
                    : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`px-2 py-1 text-xs font-bold ${
                    task.type === 'nlp' ? 'bg-blue-900 text-blue-400' :
                    task.type === 'classification' ? 'bg-green-900 text-green-400' :
                    task.type === 'regression' ? 'bg-yellow-900 text-yellow-400' :
                    'bg-purple-900 text-purple-400'
                  }`}>
                    {task.type.toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold">{task.description}</h3>
                    <p className="text-xs text-gray-400 font-mono">{task.input.substring(0, 50)}...</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Run Inference */}
        <section className="bg-gray-900 border-4 border-cyan-400 p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-400 mb-2">INPUT</div>
              <div className="p-4 bg-gray-800 border-2 border-gray-700 font-mono text-sm">
                {selectedTask.input}
              </div>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-700">
              <div className="text-sm text-gray-400 mb-2">SELECTED MODEL</div>
              <div className="font-bold text-cyan-400">{selectedModel.name}</div>
              <div className="text-sm text-gray-400 mt-1">
                Price: {selectedModel.pricePerInference} • Proof: {selectedModel.proofSize}
              </div>
            </div>
          </div>
          <button
            onClick={runInference}
            disabled={isProcessing}
            className="w-full mt-6 py-4 bg-cyan-500 text-white font-bold border-4 border-cyan-400 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-xl"
          >
            {isProcessing ? 'Processing...' : 'Run Inference with ZK Proof'}
          </button>
        </section>

        {/* Results */}
        {result && (
          <section className="bg-gray-900 border-4 border-green-400 p-6">
            <h2 className="text-xl font-black text-green-400 mb-2">Inference Result</h2>
            <div className="p-4 bg-green-900/30 border-2 border-green-500 font-bold text-xl">
              {result}
            </div>
          </section>
        )}

        {/* ZK Proof */}
        {proofResult && (
          <section className="bg-gray-900 border-4 border-purple-400 p-6">
            <h2 className="text-xl font-black text-purple-400 mb-4">Zero-Knowledge Proof</h2>
            <pre className="p-4 bg-gray-800 border-2 border-gray-700 overflow-x-auto text-sm font-mono whitespace-pre-wrap">
              {proofResult}
            </pre>
          </section>
        )}

        {/* How It Works */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">How ZKML Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">1️⃣</div>
              <h3 className="font-bold text-cyan-400 mb-2">Run Model</h3>
              <p className="text-xs text-gray-400">Model executes on decentralized compute</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">2️⃣</div>
              <h3 className="font-bold text-green-400 mb-2">Generate Proof</h3>
              <p className="text-xs text-gray-400">ZK proof proves correctness without revealing data</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">3️⃣</div>
              <h3 className="font-bold text-purple-400 mb-2">Verify Proof</h3>
              <p className="text-xs text-gray-400">Verifiers check proof is valid and output matches input</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">4️⃣</div>
              <h3 className="font-bold text-yellow-400 mb-2">Get Result</h3>
              <p className="text-xs text-gray-400">Consumers receive privacy-preserving inference</p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="bg-gray-900 border-4 border-cyan-400 p-6">
          <h2 className="text-xl font-black text-cyan-400 mb-4">Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-gray-800 border border-gray-700">
              <h3 className="font-bold text-cyan-400 mb-2">Private Data Analysis</h3>
              <p className="text-gray-400">Run ML models on sensitive data without exposing it</p>
            </div>
            <div className="p-3 bg-gray-800 border border-gray-700">
              <h3 className="font-bold text-cyan-400 mb-2">Supply Chain AI</h3>
              <p className="text-gray-400">Verify quality predictions without sharing proprietary models</p>
            </div>
            <div className="p-3 bg-gray-800 border border-gray-700">
              <h3 className="font-bold text-cyan-400 mb-2">Financial Fraud Detection</h3>
              <p className="text-gray-400">Detect patterns while protecting customer data privacy</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-8 border-t border-gray-800">
          <p>
            Built by <a href="https://x.com/samdevrel" className="text-cyan-400 hover:underline">@samdevrel</a>
            {' • '}
            Data is simulated for demo purposes
          </p>
        </footer>
      </div>
    </main>
  );
}
