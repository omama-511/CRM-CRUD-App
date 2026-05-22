<?php
declare(strict_types=1);

namespace App\Controller;

/**
 * Leads Controller
 *
 * @property \App\Model\Table\LeadsTable $Leads
 */
class LeadsController extends AppController
{
    public function initialize(): void
    {
        parent::initialize();
        $this->viewBuilder()->setClassName('Json');
    }
    /**
     * Index method
     *
     * @return \Cake\Http\Response|null|void Renders view
     */
    public function index()
    {
        $this->paginate = [
            'limit' => 25,
            'maxLimit' => 100
        ];

        $query = $this->Leads->find()->orderBy(['id' => 'DESC']);

        $q = $this->request->getQuery('q');
        if ($q) {
            $query->where([
                'OR' => [
                    'first_name LIKE' => '%' . $q . '%',
                    'last_name LIKE' => '%' . $q . '%',
                    'company_name LIKE' => '%' . $q . '%',
                    'email LIKE' => '%' . $q . '%',
                    'phone LIKE' => '%' . $q . '%',
                    'cell LIKE' => '%' . $q . '%',
                ]
            ]);
        }

        $leads = $this->paginate($query);

        $this->set([
            'status' => 'success',
            'data' => compact('leads')
        ]);
        $this->viewBuilder()->setOption('serialize', ['status', 'data']);
    }

    /**
     * View method
     *
     * @param string|null $id Lead id.
     * @return \Cake\Http\Response|null|void Renders view
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        try {
            $lead = $this->Leads->get($id, contain: []);
            $this->set([
                'status' => 'success',
                'data' => compact('lead')
            ]);
        } catch (\Exception $e) {
            $this->response = $this->response->withStatus(404);
            $this->set([
                'status' => 'error',
                'message' => 'Lead not found'
            ]);
        }
        $this->viewBuilder()->setOption('serialize', ['status', 'data', 'message']);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null|void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $this->request->allowMethod(['post', 'options']);
        $lead = $this->Leads->newEmptyEntity();
        $lead = $this->Leads->patchEntity($lead, $this->request->getData());
        
        if ($this->Leads->save($lead)) {
            $this->set([
                'status' => 'success',
                'data' => compact('lead')
            ]);
        } else {
            $this->response = $this->response->withStatus(400);
            $this->set([
                'status' => 'error',
                'message' => 'Failed to save lead',
                'data' => ['errors' => $lead->getErrors()]
            ]);
        }
        $this->viewBuilder()->setOption('serialize', ['status', 'data', 'message']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Lead id.
     * @return \Cake\Http\Response|null|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $this->request->allowMethod(['patch', 'post', 'put', 'options']);
        try {
            $lead = $this->Leads->get($id, contain: []);
            $lead = $this->Leads->patchEntity($lead, $this->request->getData());
            if ($this->Leads->save($lead)) {
                $this->set([
                    'status' => 'success',
                    'data' => compact('lead')
                ]);
            } else {
                $this->response = $this->response->withStatus(400);
                $this->set([
                    'status' => 'error',
                    'message' => 'Failed to update lead',
                    'data' => ['errors' => $lead->getErrors()]
                ]);
            }
        } catch (\Exception $e) {
            $this->response = $this->response->withStatus(404);
            $this->set([
                'status' => 'error',
                'message' => 'Lead not found'
            ]);
        }
        $this->viewBuilder()->setOption('serialize', ['status', 'data', 'message']);
    }

    /**
     * Delete method
     *
     * @param string|null $id Lead id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete', 'options']);
        try {
            $lead = $this->Leads->get($id);
            if ($this->Leads->delete($lead)) {
                $this->set([
                    'status' => 'success',
                    'data' => null
                ]);
            } else {
                $this->response = $this->response->withStatus(400);
                $this->set([
                    'status' => 'error',
                    'message' => 'Failed to delete lead'
                ]);
            }
        } catch (\Exception $e) {
            $this->response = $this->response->withStatus(404);
            $this->set([
                'status' => 'error',
                'message' => 'Lead not found'
            ]);
        }

        $this->viewBuilder()->setOption('serialize', ['status', 'data', 'message']);
    }
}
